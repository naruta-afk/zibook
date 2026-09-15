import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import CartTotal from '../Components/CartTotal'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cartItems: items, updateQuantity, removeFromCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')
  const [address, setAddress] = useState('789 Elm Street, Springfield, California, US')

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.02
  const total = subtotal + shipping + tax

  const placeOrder = () => {
    if (!items.length) return
    toast.success('Order placed successfully')
  }

  return (
    <div className="max-padd-container bg-white py-10 md:py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Your cart</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-800">Cart <span className="font-normal underline decoration-slate-500 underline-offset-2">Overview</span></h1>
        <p className="mt-2 max-w-md">Discover books that spark curiosity, deliver quality, and bring inspiration to your everyday reading.</p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_0.85fr]">
        <section className="overflow-visible">
          <div className="grid grid-cols-[1fr_72px_62px] items-center gap-4 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-slate-700 sm:grid-cols-[1fr_120px_90px]">
            <span>Product Details</span>
            <span className="text-right">Subtotal</span>
            <span className="text-right">Action</span>
          </div>

          {items.length ? items.map((item) => (
            <div key={item._id} className="mb-3 grid grid-cols-[1fr_72px_62px] items-center gap-4 rounded-xl bg-primary px-4 py-3 sm:grid-cols-[1fr_120px_90px]">
              <div className="flex min-w-0 items-center gap-4">
                <img src={item.image} alt={item.name} className="h-16 w-12 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-slate-800 sm:text-base">{item.name}</h3>
                  <div className="mt-2 flex items-center gap-1.5">
                    <button type="button" onClick={() => updateQuantity(item._id, -1)} className="h-6 w-6 rounded-full border border-white bg-white text-sm text-slate-600" aria-label={`Decrease ${item.name} quantity`}>-</button>
                    <span className="w-4 text-center text-xs font-semibold text-slate-700">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item._id, 1)} className="h-6 w-6 rounded-full border border-white bg-white text-sm text-slate-600" aria-label={`Increase ${item.name} quantity`}>+</button>
                  </div>
                </div>
              </div>
              <span className="text-right text-sm text-slate-600">${item.price * item.quantity}</span>
              <button type="button" onClick={() => removeFromCart(item._id)} className="justify-self-end text-sm font-semibold text-violet-500 transition hover:text-red-500">Delete</button>
            </div>
          )) : (
            <div className="px-6 py-20 text-center">
              <h2 className="text-xl font-semibold text-slate-800">Your cart is empty</h2>
              <Link to="/shop" className="mt-5 inline-block btn-secondary">Browse books</Link>
            </div>
          )}

          <div className="flex flex-wrap justify-between gap-4 px-5 py-5">
            <Link to="/shop" className="btn-outline">Continue shopping</Link>
            <span className="self-center text-sm text-slate-500">{items.length} product{items.length === 1 ? '' : 's'}</span>
          </div>
        </section>

        <CartTotal
          itemCount={items.reduce((count, item) => count + item.quantity, 0)}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
          address={address}
          paymentMethod={paymentMethod}
          onAddressChange={() => setAddress('137 Library Avenue, New York')}
          onPaymentChange={setPaymentMethod}
          onPlaceOrder={placeOrder}
          disabled={!items.length}
        />
      </div>
    </div>
  )
}

export default Cart