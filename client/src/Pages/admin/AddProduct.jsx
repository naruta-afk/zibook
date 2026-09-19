import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/admin/sidebar'
import { useAdmin } from '../../context/AdminContext'

const initialForm = {
	name: '',
	price: '',
	category: '',
	description: '',
	image: '',
	inStock: true,
	popular: false,
}

const AddProduct = () => {
	const [form, setForm] = useState(initialForm)
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const { addBook, categories } = useAdmin()
	const navigate = useNavigate()

	const updateField = (event) => {
		const { name, value, type, checked } = event.target
		setForm((currentForm) => ({
			...currentForm,
			[name]: type === 'checkbox' ? checked : value,
		}))
	}

		const handleImageUpload = (event) => {
			const file = event.target.files?.[0]
			if (!file) return

			if (!file.type.startsWith('image/')) {
				toast.error('Please select an image file.')
				return
			}

			const reader = new FileReader()
			reader.onload = () => setForm((currentForm) => ({ ...currentForm, image: reader.result }))
			reader.readAsDataURL(file)
		}

	const handleSubmit = (event) => {
		event.preventDefault()

		if (!form.name.trim() || !form.price || !form.category || !form.description.trim()) {
			toast.error('Complete all required fields.')
			return
		}

		addBook({
			...form,
			name: form.name.trim(),
			description: form.description.trim(),
			image: form.image.trim() || '/placeholder-book.png',
		})
		toast.success('Book added successfully')
		setForm(initialForm)
		navigate('/admin/list')
	}

	return (
		<div className="min-h-screen bg-slate-50 lg:flex">
			{sidebarOpen && <button type="button" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden" aria-label="Close navigation" />}
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

			<main className="min-w-0 flex-1 p-5 sm:p-8">
				<button type="button" onClick={() => setSidebarOpen(true)} className="mb-5 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm lg:hidden">
					Open menu
				</button>

				<div className="mb-8">
					<p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Inventory</p>
					<h1 className="mt-1 text-3xl font-bold text-slate-900">Add new book</h1>
					<p className="mt-2 text-sm text-slate-500">Create a product that will appear in your admin book list.</p>
				</div>

				<form onSubmit={handleSubmit} className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
					<div className="grid gap-5 md:grid-cols-2">
						<label className="block md:col-span-2">
							<span className="mb-2 block text-sm font-semibold text-slate-700">Book name *</span>
							<input name="name" value={form.name} onChange={updateField} placeholder="Enter book name" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
						</label>

						<label className="block">
							<span className="mb-2 block text-sm font-semibold text-slate-700">Price *</span>
							<input name="price" type="number" min="0" step="0.01" value={form.price} onChange={updateField} placeholder="0.00" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
						</label>

						<label className="block">
							<span className="mb-2 block text-sm font-semibold text-slate-700">Category *</span>
							<select name="category" value={form.category} onChange={updateField} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100">
								<option value="">Select category</option>
								{categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}
							</select>
						</label>

						<div className="md:col-span-2">
							<span className="mb-2 block text-sm font-semibold text-slate-700">Book cover</span>
							<div className="grid gap-3 sm:grid-cols-2">
								<input name="image" type="url" value={form.image.startsWith('data:') ? '' : form.image} onChange={updateField} placeholder="Paste image URL" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
								<label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100">
									<span>{form.image.startsWith('data:') ? 'Change local image' : 'Upload local image'}</span>
									<input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
								</label>
							</div>
							{form.image && <img src={form.image} alt="Book cover preview" className="mt-4 h-32 w-24 rounded-xl border border-slate-200 object-cover" />}
						</div>

						<label className="block md:col-span-2">
							<span className="mb-2 block text-sm font-semibold text-slate-700">Description *</span>
							<textarea name="description" value={form.description} onChange={updateField} rows="5" placeholder="Describe this book" className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100" />
						</label>
					</div>

					<div className="mt-6 flex flex-wrap gap-6 border-t border-slate-100 pt-5">
						<label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
							<input name="inStock" type="checkbox" checked={form.inStock} onChange={updateField} className="h-4 w-4 accent-violet-600" />
							In stock
						</label>
						<label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
							<input name="popular" type="checkbox" checked={form.popular} onChange={updateField} className="h-4 w-4 accent-violet-600" />
							Mark as popular
						</label>
					</div>

					<div className="mt-8 flex flex-wrap gap-3">
						<button type="submit" className="btn-secondary">Add book</button>
						<button type="button" onClick={() => setForm(initialForm)} className="btn-outline">Clear form</button>
					</div>
				</form>
			</main>
		</div>
	)
}

export default AddProduct
