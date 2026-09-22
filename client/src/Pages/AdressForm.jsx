import { useState } from 'react'
import toast from 'react-hot-toast'
import { api } from '../api'

const AdressForm = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', street: '', city: '', state: '', country: '', zipcode: '', phone: '' })
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)

    try {
      // the server expects the fields inside an `address` object
      const { data } = await api.post('/api/address/add', {
        address: { ...form, zipcode: Number(form.zipcode), phone: Number(form.phone) },
      })
      if (!data.success) throw new Error(data.message)
      toast.success('Address saved successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Could not save address')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-padd-container py-10">
      <div className="mx-auto max-w-3xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Checkout</p>
        <h1 className="mt-2 h2">Shipping details</h1>

        <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">First name</span>
            <input name="firstName" value={form.firstName} onChange={handleChange} required type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Last name</span>
            <input name="lastName" value={form.lastName} onChange={handleChange} required type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
            <input name="email" value={form.email} onChange={handleChange} required type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Street address</span>
            <input name="street" value={form.street} onChange={handleChange} required type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">City</span>
            <input name="city" value={form.city} onChange={handleChange} required type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Postal code</span>
            <input name="zipcode" value={form.zipcode} onChange={handleChange} required type="number" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">State</span>
            <input name="state" value={form.state} onChange={handleChange} required type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Country</span>
            <input name="country" value={form.country} onChange={handleChange} required type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Phone</span>
            <input name="phone" value={form.phone} onChange={handleChange} required type="tel" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>

          <div className="md:col-span-2 mt-2">
            <button type="submit" disabled={isSaving} className="btn-secondary disabled:opacity-60">{isSaving ? 'Saving...' : 'Place order'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdressForm
