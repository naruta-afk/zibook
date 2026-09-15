import React from 'react'
import { NavLink } from 'react-router-dom'
import { TbHome, TbBrandBlogger } from 'react-icons/tb'
import { IoLibraryOutline } from 'react-icons/io5'
import { PiEnvelopeOpenDuotone } from 'react-icons/pi'

const navItem = [
  { to: '/', label: 'Home', icon: <TbHome /> },
  { to: '/shop', label: 'Shop', icon: <IoLibraryOutline /> },
  { to: '/blog', label: 'Blog', icon: <TbBrandBlogger /> },
  {
    to: '/contact',
    label: 'Contact',
    icon: <PiEnvelopeOpenDuotone />,
  },
]

const Navbar = ({ containerStyles, setMenuOpened }) => {
  return (
    <nav className={containerStyles}>
      {navItem.map(({ to, label, icon }) => (
        <div key={label}>
          <NavLink
            to={to}
            onClick={() => setMenuOpened?.(false)}
            className={({ isActive }) =>
              `${isActive ? 'bg-white ring-1 ring-slate-900/10' : ''} flexCenter gap-x-2 rounded-full px-4 py-2`
            }
          >
            <span className="text-lg">{icon}</span>
            <span className="medium-15">{label}</span>
          </NavLink>
        </div>
      ))}
    </nav>
  )
}

export default Navbar