import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { api } from '../api'

const MyOrder = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.post('/api/order/userorders')
        if (!data.success) throw new Error(data.message || 'Could not load your orders')
        setOrders(data.orders || [])
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || 'Unable to load orders')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="max-padd-container py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Orders</p>
        <h1 className="mt-2 h2">My orders</h1>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading your orders...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-[30px] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
          You have no orders yet.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <p className="font-semibold text-slate-800">{order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <p className={`font-semibold ${order.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}`}>{order.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="font-semibold text-slate-800">${Number(order.amount || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Payment</p>
                  <p className="font-semibold text-slate-800">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {order.items?.map((item, index) => (
                  <div key={`${order._id}-${index}`} className="flex items-center gap-4 rounded-[20px] bg-slate-50 p-3">
                    <img src={item.product?.image?.[0] || item.product?.image || '/placeholder-book.png'} alt={item.product?.name || 'Product'} className="h-24 w-20 rounded-[14px] object-cover" />
                    <div>
                      <h3 className="font-semibold text-slate-800">{item.product?.name || 'Book'}</h3>
                      <p className="mt-1 text-sm text-slate-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-slate-500">{item.product?.category || 'Book category'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyOrder
