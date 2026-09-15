import { Link, useParams } from 'react-router-dom'
import { dummyBooks } from '../assets/data'
import { useCart } from '../context/CartContext'

const ProductDetails = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  const book = dummyBooks.find((item) => item._id === id)

  if (!book) {
    return (
      <div className="max-padd-container py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800">Book not found</h2>
        <Link to="/shop" className="mt-5 inline-block btn-secondary">Back to shop</Link>
      </div>
    )
  }

  return (
    <div className="max-padd-container py-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-[30px] bg-primary p-6 shadow-sm">
          <img src={book.image} alt={book.name} className="h-[540px] w-full rounded-[24px] object-cover" />
        </div>

        <div className="space-y-6 py-2">
          <span className="inline-flex rounded-full bg-primary px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-700">
            {book.category}
          </span>
          <h1 className="h2 leading-tight">{book.name}</h1>

          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span>{book.popular ? 'Popular pick' : 'New release'}</span>
            <span>•</span>
            <span>{book.inStock ? 'Available now' : 'Out of stock'}</span>
          </div>

          <div className="text-4xl font-bold text-slate-900">${book.price}</div>

          <p className="max-w-xl text-base text-slate-600">{book.description}</p>

          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={() => addToCart(book)} className="btn-secondary">Add to cart</button>
            <Link to="/shop" className="btn-outline">Continue shopping</Link>
          </div>

          <div className="grid gap-4 rounded-[24px] border border-slate-200 bg-white p-5 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Format</p>
              <p className="mt-2 font-semibold text-slate-800">Hardcover</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Pages</p>
              <p className="mt-2 font-semibold text-slate-800">240</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Author</p>
              <p className="mt-2 font-semibold text-slate-800">Zibook Studio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails