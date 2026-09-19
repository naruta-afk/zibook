import { useState } from 'react'
import { FaBars } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import Sidebar from '../../Components/admin/sidebar'
import { useAdmin } from '../../context/AdminContext'

const orderStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

const formatDate = (value) => new Date(value).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

const Orders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { orders, updateOrderStatus } = useAdmin()

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status)
    toast.success('Order status updated')
  }

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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Sales</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">Orders</h1>
          </div>
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <h2 className="font-semibold text-slate-900">Recent orders</h2>
            <p className="mt-1 text-sm text-slate-500">Review purchases and update their delivery status.</p>
          </div>

          {orders.length === 0 ? (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Order</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Items</th>
                    <th className="px-6 py-4 font-semibold">Total</th>
                    <th className="px-6 py-4 font-semibold">Payment</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => {
                    const customerName = `${order.address?.firstName || 'Guest'} ${order.address?.lastName || ''}`.trim()
                    const itemCount = order.items?.reduce((total, item) => total + Number(item.quantity || 0), 0) || 0
                    const total = Number(order.amount ?? order.total ?? 0)

                    return (
                      <tr key={order._id} className="align-middle hover:bg-slate-50/70">
                        <td className="px-6 py-5">
                          <p className="max-w-[170px] truncate font-semibold text-slate-800" title={order._id}>#{order._id.slice(-8)}</p>
                          <p className="mt-1 text-xs text-slate-500">{formatDate(order.createdAt)}</p>
                        </td>
                        <td className="px-6 py-5">
                          <p className="font-medium text-slate-800">{customerName}</p>
                          <p className="mt-1 text-xs text-slate-500">{order.address?.city || 'No city'}</p>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-600">{itemCount} item{itemCount === 1 ? '' : 's'}</td>
                        <td className="px-6 py-5 font-semibold text-slate-800">${total.toFixed(2)}</td>
                        <td className="px-6 py-5">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${order.isPaid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                            {order.isPaid ? 'Paid' : 'Pending'}
                          </span>
                          <p className="mt-2 text-xs uppercase text-slate-400">{order.paymentMethod}</p>
                        </td>
                        <td className="px-6 py-5">
                          <select value={order.status} onChange={(event) => handleStatusChange(order._id, event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
                            {orderStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                          </select>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Orders