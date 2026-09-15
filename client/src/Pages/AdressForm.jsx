const AdressForm = () => {
  return (
    <div className="max-padd-container py-10">
      <div className="mx-auto max-w-3xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Checkout</p>
        <h1 className="mt-2 h2">Shipping details</h1>

        <form className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">First name</span>
            <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Last name</span>
            <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
            <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Street address</span>
            <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">City</span>
            <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Postal code</span>
            <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Country</span>
            <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
          </label>

          <div className="md:col-span-2 mt-2">
            <button type="submit" className="btn-secondary">Place order</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdressForm
