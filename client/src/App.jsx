import { Toaster } from 'react-hot-toast'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
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
import AuthProvider from './context/AuthContext'
import AdminProvider from './context/AdminContext'
import AdminLogin from './Components/admin/adminlogin'
import AdminDashboard from './Components/admin/AdminDashboard'
import AddProduct from './Pages/admin/AddProduct'
import Orders from './Pages/admin/Orders'
import ProductList from './Pages/admin/ProductList'
import { useAuth } from './context/AuthContext'

const AdminRoute = ({ children }) => {
  const { isAdmin } = useAuth()

  return isAdmin ? children : <Navigate to="/admin/login" replace />
}

const AdminEntry = () => {
  const { isAdmin } = useAuth()

  return <Navigate to={isAdmin ? '/admin/dashboard' : '/admin/login'} replace />
}

const AdminLayout = () => (
  <AdminRoute>
    <Outlet />
  </AdminRoute>
)

const App = () => {
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  return (
    <AuthProvider>
      <AdminProvider>
        <CartProvider>
          <main className="min-h-screen bg-white text-slate-800">
            {!isAdminPage && <Header />}
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
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminEntry />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="add-item" element={<AddProduct />} />
                <Route path="orders" element={<Orders />} />
                <Route path="list" element={<ProductList />} />
               
              </Route>
            </Routes>
            <Footer />
          </main>
        </CartProvider>
      </AdminProvider>
    </AuthProvider>
  )
}

export default App
