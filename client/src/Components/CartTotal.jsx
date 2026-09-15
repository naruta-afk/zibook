import React from 'react'
import { Link } from 'react-router-dom'

const CartTotal = ({ itemCount = 0, subtotal = 0, shipping = 0, tax = 0, total = 0, address, paymentMethod, onAddressChange, onPaymentChange, onPlaceOrder, disabled = false }) => {
  return (
    <aside className="rounded-[26px] bg-primary p-6 shadow-sm lg:sticky lg:top-6">
      <h2 className="text-2xl font-bold text-slate-800">Order Details <span className="text-sm font-semibold text-violet-500">({itemCount} Items)</span></h2>

      <div className="my-5 border-t border-slate-300" />

      <div className="border-b border-slate-300 pb-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-semibold text-slate-800">Where to ship your order?</h3>
          <button type="button" onClick={onAddressChange} className="text-sm font-medium text-violet-500">Change</button>
        </div>
        <p className="mt-3 text-sm text-slate-500">{address || 'No address found'}</p>
      </div>

      <div className="border-b border-slate-300 py-5">
        <h3 className="font-semibold text-slate-800">Payment Method?</h3>
        <div className="mt-4 flex gap-3">
          {['Cash on Delivery', 'Stripe'].map((method) => (
            <button key={method} type="button" onClick={() => onPaymentChange(method)} className={`rounded-full px-5 py-1.5 text-xs font-semibold transition ${paymentMethod === method ? 'bg-secondary text-white' : 'bg-white text-slate-600'}`}>
              {method}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 py-5 text-sm font-medium text-slate-600">
        <div className="flex justify-between"><span>Price</span><span>${subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Shipping Fee</span><span>${shipping.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Tax (2%)</span><span>${tax.toFixed(2)}</span></div>
        <div className="flex justify-between pt-1 text-base font-bold text-slate-800"><span>Total Amount:</span><span>${total.toFixed(2)}</span></div>
      </div>

      <button type="button" onClick={onPlaceOrder} disabled={disabled} className="w-full rounded-xl bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50">
        Proceed to order
      </button>
      <Link to="/checkout" className={`mt-3 block text-center text-sm font-medium text-violet-500 ${disabled ? 'pointer-events-none opacity-50' : ''}`}>Add delivery details</Link>
    </aside>
  )
}

export default CartTotal
