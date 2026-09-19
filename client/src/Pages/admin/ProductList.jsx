import { useMemo, useState } from 'react'
import { FaBars, FaPen, FaPlus, FaTrash } from 'react-icons/fa6'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Sidebar from '../../Components/admin/sidebar'
import { useAdmin } from '../../context/AdminContext'

const ProductList = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [editingId, setEditingId] = useState(null)
	const { books, updateBook, deleteBook } = useAdmin()

	const filteredBooks = useMemo(() => {
		const query = searchTerm.trim().toLowerCase()
		if (!query) return books

		return books.filter((book) => `${book.name} ${book.category} ${book.description}`.toLowerCase().includes(query))
	}, [books, searchTerm])

	const handleDelete = (book) => {
		if (!window.confirm(`Delete ${book.name}?`)) return
		deleteBook(book._id)
		toast.success('Book deleted')
	}

	const handleEdit = (book) => {
		const name = window.prompt('Book name', book.name)
		if (!name?.trim()) return

		const price = window.prompt('Price', String(book.price))
		if (price === null || Number.isNaN(Number(price))) return

		updateBook(book._id, { name: name.trim(), price: Number(price) })
		setEditingId(null)
		toast.success('Book updated')
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
					<div className="min-w-0 flex-1">
						<p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-600">Inventory</p>
						<h1 className="mt-1 text-3xl font-bold text-slate-900">Book list</h1>
					</div>
					<Link to="/admin/add-item" className="btn-secondary hidden items-center gap-2 sm:flex">
						<FaPlus aria-hidden="true" />
						Add book
					</Link>
				</div>

				<section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
					<div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
						<div>
							<h2 className="font-semibold text-slate-900">All books</h2>
							<p className="mt-1 text-sm text-slate-500">{filteredBooks.length} of {books.length} books</p>
						</div>
						<input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} type="search" placeholder="Search books..." className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 sm:max-w-xs" />
					</div>

					{filteredBooks.length === 0 ? (
						<div className="px-6 py-14 text-center">
							<p className="font-semibold text-slate-800">No books found</p>
							<p className="mt-1 text-sm text-slate-500">Try a different search term or add a new book.</p>
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full min-w-[760px] text-left">
								<thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
									<tr>
										<th className="px-6 py-4 font-semibold">Book</th>
										<th className="px-6 py-4 font-semibold">Category</th>
										<th className="px-6 py-4 font-semibold">Price</th>
										<th className="px-6 py-4 font-semibold">Status</th>
										<th className="px-6 py-4 text-right font-semibold">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100">
									{filteredBooks.map((book) => (
										<tr key={book._id} className="hover:bg-slate-50/70">
											<td className="px-6 py-4">
												<div className="flex items-center gap-3">
													<img src={book.image} alt={book.name} className="h-14 w-11 rounded-lg bg-slate-100 object-cover" />
													<div className="min-w-0">
														<p className="max-w-[240px] truncate font-semibold text-slate-800">{book.name}</p>
														{book.popular && <span className="mt-1 inline-block rounded-full bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-700">Popular</span>}
													</div>
												</div>
											</td>
											<td className="px-6 py-4 text-sm text-slate-600">{book.category}</td>
											<td className="px-6 py-4 font-semibold text-slate-800">${Number(book.price).toFixed(2)}</td>
											<td className="px-6 py-4">
												<span className={`rounded-full px-3 py-1 text-xs font-semibold ${book.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
													{book.inStock ? 'In stock' : 'Out of stock'}
												</span>
											</td>
											<td className="px-6 py-4">
												<div className="flex justify-end gap-2">
													<button type="button" onClick={() => { setEditingId(book._id); handleEdit(book) }} className="rounded-lg p-2 text-slate-500 hover:bg-violet-50 hover:text-violet-700" aria-label={`Edit ${book.name}`} title="Edit book">
														<FaPen />
													</button>
													<button type="button" onClick={() => handleDelete(book)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${book.name}`} title="Delete book">
														<FaTrash />
													</button>
												</div>
												{editingId === book._id && <span className="sr-only">Editing {book.name}</span>}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</section>
			</main>
		</div>
	)
}

export default ProductList
