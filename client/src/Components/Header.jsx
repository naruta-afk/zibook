import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import logoImg from '../assets/logo.png'
import userImg from '../assets/user.png'
import loginIcon from '../assets/user.png'
import { FaBarsStaggered, FaBars } from 'react-icons/fa6'
import {FaSearch} from 'react-icons/fa'
import Navbar from './Navbar'
import Login from './Login'
import { useCart } from '../context/CartContext'

const Header = () => {

const [menuOpened, setMenuOpened] = useState(false)
const [showSearch, setShowSearch] = useState(false)
const [user, setUser] = useState(() => {
  try {
    return Boolean(localStorage.getItem('zibookUser'))
  } catch {
    return false
  }
})
const [isLoginOpen, setIsLoginOpen] = useState(false)
const [searchQuery, setSearchQuery] = useState('')
const navigate = useNavigate()
const { cartCount } = useCart()

useEffect(() => {
  const syncUser = () => setUser(Boolean(localStorage.getItem('zibookUser')))
  window.addEventListener('zibook-auth-change', syncUser)

  return () => window.removeEventListener('zibook-auth-change', syncUser)
}, [])

const toggleMenu = () => {
  setMenuOpened(prev => !prev)
  setShowSearch(false)
}

  const handleSearch = (event) => {
    event.preventDefault()
    const query = searchQuery.trim()

    if (!query) return

    navigate(`/shop?search=${encodeURIComponent(query)}`)
    setShowSearch(false)
  }

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return

    setUser(true)
    localStorage.setItem('zibookUser', JSON.stringify({ email }))
    setIsLoginOpen(false)
    toast.success('Logged in successfully')
    navigate('/my-orders')
  }

  const handleRegister = ({ name, email }) => {
    setUser(true)
    localStorage.setItem('zibookUser', JSON.stringify({ name, email }))
    setIsLoginOpen(false)
    toast.success('Account created successfully')
    navigate('/shop')
  }

  const handleLogout = () => {
    setUser(false)
    localStorage.removeItem('zibookUser')
    toast('Logged out', { icon: '👋' })
    navigate('/')
  }


  return (
    <header className="relative z-50 w-full bg-white">
      {/* LOGO */}
      <div className="max-padd-container flex items-center justify-between gap-4 py-2">
        <div className="flex shrink-0 items-center justify-start">
          <Link to={"/"} className="flex items-end gap-2 leading-none">
            <img src={logoImg} alt=" " className="hidden h-9 sm:block" />
            <div className="flex items-end gap-1 text-[28px] font-bold">
              <span className="text-slate-900">Ziboo</span>
              <span className="text-violet-500">k.</span>
            </div>
          </Link>
        </div>

        {/* NAVBAR FOR MOBILE & DESKTOP */}
        <div className="flex flex-1 items-center justify-center pl-5 lg:pl-10">
          <Navbar
            setMenuOpened={setMenuOpened}
            containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-5 fixed top-16 right-6 p-4 bg-white rounded-xl shadow-md w-52 ring-1 ring-slate-900/5 z-50" : "hidden lg:flex items-center gap-x-0 rounded-full bg-primary p-1 ring-1 ring-slate-900/10"}`}
          />
        </div>

        <div className="flex items-center justify-end gap-x-4 sm:gap-x-6">
        <div className="relative">
          <button type="button" onClick={() => setShowSearch((currentValue) => !currentValue)} className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-slate-700 transition hover:bg-violet-100" aria-label="Search books">
            <FaSearch />
          </button>
          {showSearch && (
            <form onSubmit={handleSearch} className="absolute right-0 top-12 z-50 flex w-64 gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
              <input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} type="search" placeholder="Search books" className="min-w-0 flex-1 rounded-xl bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200" />
              <button type="submit" className="rounded-xl bg-secondary px-3 text-sm font-semibold text-white">Go</button>
            </form>
          )}
        </div>
        <Link to={"/cart"} className="flex relative"> <div className="bold-16"> Cart <span className="[12px] text-[12px] font-semibold absolute -top-3.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-white shadow-md">{cartCount}</span> </div> </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <img src={userImg} alt="userImg" className="h-9 w-9 rounded-full object-cover" />
                <div className="hidden items-center gap-4 text-sm font-medium text-slate-700 sm:flex">
                  <button type="button" onClick={() => navigate('/my-orders')} className="cursor-pointer">
                    Orders
                  </button>
                  <button type="button" onClick={handleLogout} className="cursor-pointer">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => setIsLoginOpen(true)} className="btn-light flex items-center gap-2">
                Login <img src={loginIcon} alt="Login" className="h-5 w-5 object-contain" />
              </button>
            )}
          </div>

          <Login
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onLogin={handleLogin}
            onRegister={handleRegister}
          />

          {/* MENU TOGGLE */}
          <>
            {menuOpened ? (
              <FaBarsStaggered onClick={toggleMenu} className="lg:hidden cursor-pointer text-xl" />
            ) : (
              <FaBars onClick={toggleMenu} className="lg:hidden cursor-pointer text-xl" />
            )}
          </>
        </div>
      </div>
    </header>
  )
}

export default Header
