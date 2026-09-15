import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import CategoryShop from './Pages/CategoryShop'
import ProductDetails from './Pages/ProductDetails'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import MyOrder from './Pages/MyOrder'
import AdressForm from './Pages/AdressForm'
import CartProvider from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <main className="min-h-screen bg-white text-slate-800">
        <Header />
        <Toaster position="bottom-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<CategoryShop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrder />} />
          <Route path="/checkout" element={<AdressForm />} />
        </Routes>
        <Footer />
      </main>
    </CartProvider>
  )
}

export default App
