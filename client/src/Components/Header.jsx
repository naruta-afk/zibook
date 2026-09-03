import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'
import userImg from '../assets/user.png'
import { FaBarsStaggered, FaBars } from 'react-icons/fa6'
import {FaSearch} from 'react-icons/fa'
import {RiUserLine} from 'react-icons/ri'
import Navbar from './Navbar'

const Header = () => {

const [menuOpened, setMenuOpened] = useState(false)
const [showSearch, setShowSearch] = useState(false)


  return (
    <header >
      {/*LOGO*/}
      <div className="flex flex-1">
        <Link to={"/"} className= "bold-28 xl:bold-28 flex items-end gap-1">
          <img src= {logoImg} alt=" "  className='hidden sm:block h-9' / >
          <div className="sm:relative top-1 5">
            Ziboo
          <span className='text-secondary'>k.</span>
          </div>
        </Link>
      </div>
{    /*  NAVBAR FOR MOBILE & DESKTOP */}
<div className ="flex-1">

  <Navbar
    setMenuOpened={setMenuOpened}
    containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white rounded-xl shadow-md w-52 ring-1 ring-slate-900/5 z-50" : "hidden lg:flex gap-x-5  xl:gap-x-7  medium-15 ring-1 ring-slate-900/15 rounded-full p-1 bg-primary "}`}
  />
     
    
  </div>  
      <div>
        {/* SEARCH BAR */}
        <div className="flex items-center gap-2">
          </div>

      </div>
    </header>
  )
}

export default Header
