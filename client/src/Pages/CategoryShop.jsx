import { useParams, Link } from 'react-router-dom'
import { dummyBooks, categories } from '../assets/data'
import BookCard from '../Components/BookCard'

const CategoryShop = () => {
  const { category } = useParams()
  const normalizedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : ''
  const selectedCategory = categories.find((item) => item.name.toLowerCase() === normalizedCategory.toLowerCase())
  const books = dummyBooks.filter((book) => book.category.toLowerCase() === normalizedCategory.toLowerCase())

  if (!selectedCategory) {
    return (
      <div className="max-padd-container py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Category not found</h2>
        <Link to="/shop" className="mt-5 inline-block btn-secondary">Browse all books</Link>
      </div>
    )
  }

  return (
    <div className="max-padd-container py-10">
      <div className="mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Category</p>
          <h1 className="mt-2 h2">{selectedCategory.name}</h1>
        </div>
        <Link to="/shop" className="btn-outline">Back to shop</Link>
      </div>

      <div className="mb-8 overflow-hidden rounded-[30px] bg-primary p-6">
        <div className="flex items-center gap-6">
          <img src={selectedCategory.image} alt={selectedCategory.name} className="h-28 w-28 object-contain" />
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{books.length} books in this collection</h2>
            <p className="mt-2 max-w-xl text-slate-600">
              Explore refined reads and inspiring picks curated for {selectedCategory.name.toLowerCase()} readers.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  )
}

export default CategoryShop