import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'
import { categories, dummyBooks } from '../assets/data'
import BookCard from '../Components/BookCard'

const Shop = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchParams, setSearchParams] = useSearchParams()

  const querySearch = searchParams.get('search') || ''
  const activeSearch = search || querySearch

  const filteredBooks = useMemo(() => {
    const searchTerm = activeSearch.trim().toLowerCase()

    return dummyBooks.filter((book) => {
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory
      const matchesSearch = !searchTerm || `${book.name} ${book.category} ${book.description}`.toLowerCase().includes(searchTerm)

      return matchesCategory && matchesSearch
    })
  }, [activeSearch, selectedCategory])

  const addToCart = (book) => {
    toast.success(`${book.name} added to cart`)
  }

  return (
    <div className="max-padd-container py-10">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">The collection</p>
          <h1 className="mt-2 h2">Find your next favorite book</h1>
          <p className="mt-2 max-w-xl">Browse thoughtful picks across every shelf, from curious young readers to lifelong learners.</p>
        </div>
        <span className="text-sm font-medium text-slate-500">{filteredBooks.length} books found</span>
      </div>

      <div className="mb-8 grid gap-4 rounded-[26px] bg-primary p-5 md:grid-cols-[1.2fr_0.8fr]">
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">Search the collection</span>
          <input
            type="search"
            value={activeSearch}
            onChange={(event) => {
              setSearch(event.target.value)
              setSearchParams(event.target.value ? { search: event.target.value } : {})
            }}
            placeholder="Search by title, category, or keyword"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-violet-300"
          />
        </label>
        <label>
          <span className="mb-2 block text-sm font-medium text-slate-700">Category</span>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-violet-300"
          >
            <option value="All">All categories</option>
            {categories.map((category) => <option key={category.name} value={category.name}>{category.name}</option>)}
          </select>
        </label>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredBooks.map((book) => <BookCard key={book._id} book={book} addToCart={addToCart} />)}
        </div>
      ) : (
        <div className="rounded-[26px] border border-dashed border-slate-300 py-20 text-center">
          <h2 className="text-2xl font-bold text-slate-800">No books match your search</h2>
          <button type="button" onClick={() => { setSearch(''); setSelectedCategory('All'); setSearchParams({}) }} className="mt-5 btn-secondary">Clear filters</button>
        </div>
      )}
    </div>
  )
}

export default Shop
