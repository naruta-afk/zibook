import { dummyOrders } from '../assets/data'

const MyOrder = () => {
  return (
    <div className="max-padd-container py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Orders</p>
        <h1 className="mt-2 h2">My orders</h1>
      </div>

      <div className="space-y-6">
        {dummyOrders.map((order) => (
          <div key={order._id} className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">Order ID</p>
                <p className="font-semibold text-slate-800">{order._id}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <p className="font-semibold text-emerald-600">{order.status}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Amount</p>
                <p className="font-semibold text-slate-800">${order.amount}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {order.items.map((item, index) => (
                <div key={`${order._id}-${index}`} className="flex items-center gap-4 rounded-[20px] bg-slate-50 p-3">
                  <img src={item.book.image} alt={item.book.name} className="h-24 w-20 rounded-[14px] object-cover" />
                  <div>
                    <h3 className="font-semibold text-slate-800">{item.book.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">Qty: {item.quantity}</p>
                    <p className="text-sm text-slate-500">{item.book.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrder
