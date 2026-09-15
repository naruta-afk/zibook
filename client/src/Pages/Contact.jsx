const Contact = () => {
  return (
    <div className="max-padd-container py-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] bg-primary p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Contact</p>
          <h1 className="mt-2 h2">We’d love to hear from you</h1>
          <p className="mt-4 max-w-md text-base text-slate-600">
            Whether you’re looking for recommendations, support, or partnership ideas, our team is ready to help.
          </p>
          <div className="mt-8 space-y-5 text-slate-700">
            <p><strong>Email:</strong> hello@zibook.com</p>
            <p><strong>Phone:</strong> +1 (415) 555-0199</p>
            <p><strong>Location:</strong> 137 Library Avenue, New York, NY</p>
          </div>
        </div>

        <form className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Name</span>
              <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" placeholder="you@example.com" />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Subject</span>
            <input type="text" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" placeholder="How can we help?" />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Message</span>
            <textarea rows="6" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" placeholder="Tell us more..." />
          </label>

          <button type="submit" className="mt-6 btn-secondary">Send message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
