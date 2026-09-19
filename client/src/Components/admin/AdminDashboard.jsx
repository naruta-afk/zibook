import { useState } from 'react'
import { FaArrowRight, FaBagShopping, FaBars, FaList, FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Sidebar from './sidebar'
import { useAdmin } from '../../context/AdminContext'

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { stats } = useAdmin()

  const summaryCards = [
    { label: 'Total books', value: stats.totalBooks },
    { label: 'Books in stock', value: stats.booksInStock },
    { label: 'Total orders', value: stats.totalOrders },
    { label: 'Revenue', value: `$${stats.totalRevenue.toFixed(2)}` },
  ]

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      {sidebarOpen && <button type="button" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" aria-label="Close navigation" />}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-w-0 flex-1 p-5 sm:p-8">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setSidebarOpen(true)} className="rounded-xl bg-white p-3 text-slate-600 shadow-sm lg:hidden" aria-label="Open navigation">
            <FaBars />
          </button>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Overview</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Dashboard</h1>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <section key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{card.value}</p>
            </section>
          ))}
        </div>

        <section className="mt-8">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Manage store</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900">Admin sections</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <Link to="/admin/add-item" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-700"><FaPlus /></span>
              <h3 className="mt-5 font-semibold text-slate-900">Add item</h3>
              <p className="mt-2 text-sm text-slate-500">Add a new book to your store inventory.</p>
              <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-700">Open section <FaArrowRight className="transition group-hover:translate-x-1" /></span>
            </Link>

            <Link to="/admin/list" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><FaList /></span>
              <h3 className="mt-5 font-semibold text-slate-900">Product list</h3>
              <p className="mt-2 text-sm text-slate-500">Search, edit, and remove books from inventory.</p>
              <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-700">Open section <FaArrowRight className="transition group-hover:translate-x-1" /></span>
            </Link>

            <Link to="/admin/orders" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-md">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><FaBagShopping /></span>
              <h3 className="mt-5 font-semibold text-slate-900">Orders</h3>
              <p className="mt-2 text-sm text-slate-500">Review purchases and update delivery status.</p>
              <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-violet-700">Open section <FaArrowRight className="transition group-hover:translate-x-1" /></span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminDashboard