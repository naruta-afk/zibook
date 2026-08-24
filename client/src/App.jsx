import React from 'react'
import { Toaster } from "react-hot-toast"
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import CategoryShop from './Pages/CategoryShop'
import ProductDetails from './Pages/ProductDetails'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
const App = () => {
  return (
    <main>
      <Header />
        <Toaster position="bottom-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<CategoryShop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path = "/blog" element={<Blog />} />
          <Route path = "/contact" element={<Contact />} />
        </Routes>
      <Footer />
    </main>
  )
}

export default App
