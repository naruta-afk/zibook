import React from 'react'
import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.png'

const Footer = () => {
  return (
    <footer className="mt-8 bg-primary">
      <div className="max-padd-container flex flex-col gap-4 border-b border-slate-200/80 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700">Subscribe newsletter</h3>
          <p className="mt-1 text-xs text-slate-500">Get latest information on events, sales &amp; offers.</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()} className="flex w-full max-w-md">
          <input type="email" placeholder="Email Address" aria-label="Email Address" required className="min-w-0 flex-1 bg-white px-4 py-3 text-xs text-slate-700 outline-none placeholder:text-slate-400" />
          <button type="submit" className="bg-violet-500 px-5 py-3 text-xs font-semibold uppercase text-white transition hover:bg-violet-600">Submit</button>
        </form>
      </div>

      <div className="max-padd-container grid gap-8 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div>
          <Link to="/" className="inline-flex items-center gap-2">
            <img src={logoImg} alt="Zibook" className="h-9 w-9 object-contain" />
            <span className="text-[22px] font-bold text-slate-800">Zibook<span className="text-violet-500">a.</span></span>
          </Link>
          <p className="mt-5 max-w-xs text-slate-600">
            Discover thoughtful books online, curated for curious minds, lifelong learners, and every kind of reader.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><Link to="/" className="hover:text-violet-600">Home</Link></li>
            <li><Link to="/shop" className="hover:text-violet-600">Best Sellers</Link></li>
            <li><Link to="/shop" className="hover:text-violet-600">Offers &amp; Deals</Link></li>
            <li><Link to="/contact" className="hover:text-violet-600">Contact Us</Link></li>
            <li><Link to="/blog" className="hover:text-violet-600">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">Need Help?</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><Link to="/contact" className="hover:text-violet-600">Delivery Information</Link></li>
            <li><Link to="/contact" className="hover:text-violet-600">Return &amp; Refund Policy</Link></li>
            <li><Link to="/checkout" className="hover:text-violet-600">Payment Methods</Link></li>
            <li><Link to="/my-orders" className="hover:text-violet-600">Track your Order</Link></li>
            <li><Link to="/contact" className="hover:text-violet-600">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">Follow Us</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-violet-600">Instagram</a></li>
            <li><a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-violet-600">Twitter</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-violet-600">Facebook</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-violet-600">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1376px] border-t border-slate-300/80 px-6">
        <p className="py-4 text-center text-xs text-slate-500">Copyright 2026 © Zibook. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer