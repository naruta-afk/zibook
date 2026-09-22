import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

const readStoredCart = () => {
  try {
    const storedCart = localStorage.getItem('zibookCart')
    return storedCart ? JSON.parse(storedCart) : []
  } catch {
    return []
  }
}

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(readStoredCart)

  const saveCart = (items) => {
    setCartItems(items)
    localStorage.setItem('zibookCart', JSON.stringify(items))
  }

  const addToCart = (book) => {
    const existingItem = cartItems.find((item) => item._id === book._id)
    const updatedItems = existingItem
      ? cartItems.map((item) => item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...cartItems, { ...book, quantity: 1 }]

    saveCart(updatedItems)
    toast.success(`${book.name} added to cart`)
  }

  const updateQuantity = (id, change) => {
    const updatedItems = cartItems
      .map((item) => item._id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item)
    saveCart(updatedItems)
  }

  const removeFromCart = (id) => {
    saveCart(cartItems.filter((item) => item._id !== id))
  }

  const clearCart = () => {
    saveCart([])
  }

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) throw new Error('useCart must be used inside CartProvider')

  return context
}

export default CartProvider
