import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { dummyBooks } from '../assets/data'
import { api } from '../api'

const ShopContext = createContext(null)

// Off by default so the store keeps working with the sample books.
// Turn it on in client/.env:  VITE_USE_BACKEND=true
const USE_BACKEND = import.meta.env.VITE_USE_BACKEND === 'true'

// Keep these two in sync with server/controllers/orderController.js
const DELIVERY_CHARGES = 10
const TAX_RATE = 0.02

const CURRENCY = import.meta.env.VITE_CURRENCY || '$'

// The API stores `image` as an array and has `offerPrice`; the UI expects a single
// image URL and a single selling `price`. Convert once, here, so no page has to care.
const normalizeBook = (book) => ({
  ...book,
  image: Array.isArray(book.image) ? book.image[0] : book.image,
  images: Array.isArray(book.image) ? book.image : [book.image],
  price: book.offerPrice ?? book.price, // what the customer pays (the server charges the same)
  mrp: book.price, // original price, handy for a strikethrough
})

// Ask the API for the books. Never throws: on any problem it returns the sample books.
const loadBooks = async () => {
  try {
    const { data } = await api.get('/api/product/list')
    if (!data.success) throw new Error(data.message || 'Could not load books')
    if (data.products.length === 0) throw new Error('the database has no products yet')

    return { books: data.products.map(normalizeBook), usingDummyData: false }
  } catch (error) {
    // Development safety net: show the sample books instead of an empty shop.
    // Remove this fallback before going live.
    console.warn(`Showing sample books because ${error.message}`)
    return { books: dummyBooks, usingDummyData: true }
  }
}

/**
 * ShopContext = the store's catalogue + shared shop settings.
 *
 * Login lives in AuthContext, the cart in CartContext and admin data in AdminContext,
 * so they are intentionally NOT repeated here (two copies of the same state drift apart).
 */
const ShopProvider = ({ children }) => {
  const [books, setBooks] = useState(USE_BACKEND ? [] : dummyBooks)
  const [loading, setLoading] = useState(USE_BACKEND)
  const [usingDummyData, setUsingDummyData] = useState(!USE_BACKEND)

  const applyResult = useCallback((result) => {
    setBooks(result.books)
    setUsingDummyData(result.usingDummyData)
    setLoading(false)
  }, [])

  // Fetch all books again (e.g. after an admin adds, edits or deletes one)
  const fetchBooks = useCallback(async () => {
    if (!USE_BACKEND) return
    applyResult(await loadBooks())
  }, [applyResult])

  // First load. `ignore` stops a late response from updating an unmounted provider.
  useEffect(() => {
    if (!USE_BACKEND) return

    let ignore = false
    loadBooks().then((result) => {
      if (!ignore) applyResult(result)
    })

    return () => {
      ignore = true
    }
  }, [applyResult])

  const getBookById = useCallback((id) => books.find((book) => book._id === id), [books])

  const getBooksByCategory = useCallback(
    (category) => books.filter((book) => book.category.toLowerCase() === category.toLowerCase()),
    [books],
  )

  const value = useMemo(
    () => ({
      books,
      loading,
      usingDummyData,
      fetchBooks, // call again after an admin adds / edits / deletes a book
      getBookById,
      getBooksByCategory,
      currency: CURRENCY,
      deliveryCharges: DELIVERY_CHARGES,
      taxRate: TAX_RATE,
      api,
    }),
    [books, loading, usingDummyData, fetchBooks, getBookById, getBooksByCategory],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export const useShop = () => {
  const context = useContext(ShopContext)

  if (!context) throw new Error('useShop must be used inside ShopProvider')

  return context
}

export default ShopProvider
