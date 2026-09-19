import { createContext, useContext, useMemo, useState } from 'react'
import { categories, dummyBooks, dummyOrders } from '../assets/data'

const AdminContext = createContext(null)

const BOOKS_STORAGE_KEY = 'zibookAdminBooks'
const ORDERS_STORAGE_KEY = 'zibookOrders'

const readStoredList = (key, fallback) => {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

const AdminProvider = ({ children }) => {
  const [books, setBooks] = useState(() => readStoredList(BOOKS_STORAGE_KEY, dummyBooks))
  const [orders, setOrders] = useState(() => readStoredList(ORDERS_STORAGE_KEY, dummyOrders))

  const saveBooks = (nextBooks) => {
    setBooks(nextBooks)
    localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(nextBooks))
  }

  const saveOrders = (nextOrders) => {
    setOrders(nextOrders)
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(nextOrders))
  }

  const addBook = (book) => {
    const nextBook = {
      ...book,
      _id: book._id || `book-${Date.now()}`,
      date: book.date || Date.now(),
      price: Number(book.price) || 0,
      inStock: book.inStock !== false,
      popular: Boolean(book.popular),
    }
    saveBooks([...books, nextBook])
    return nextBook
  }

  const updateBook = (id, changes) => {
    const nextBooks = books.map((book) => book._id === id ? { ...book, ...changes, price: Number(changes.price ?? book.price) || 0 } : book)
    saveBooks(nextBooks)
    return nextBooks.find((book) => book._id === id)
  }

  const deleteBook = (id) => saveBooks(books.filter((book) => book._id !== id))

  const updateOrderStatus = (id, status) => {
    const nextOrders = orders.map((order) => order._id === id ? { ...order, status } : order)
    saveOrders(nextOrders)
  }

  const stats = useMemo(() => ({
    totalBooks: books.length,
    booksInStock: books.filter((book) => book.inStock).length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((total, order) => total + Number(order.total || 0), 0),
  }), [books, orders])

  const value = {
    books,
    orders,
    categories,
    stats,
    addBook,
    updateBook,
    deleteBook,
    updateOrderStatus,
    setOrders: saveOrders,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export const useAdmin = () => {
  const context = useContext(AdminContext)

  if (!context) throw new Error('useAdmin must be used inside AdminProvider')

  return context
}

export default AdminProvider