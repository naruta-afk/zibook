import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const BookCard = ({ book, addToCart }) => {
  const { addToCart: addBookToCart } = useCart()
  if (!book) return null

  return (
    <article className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(172,129,253,0.18)]">
      <Link to={`/product/${book._id}`} className="block overflow-hidden">
        <div className="relative overflow-hidden bg-primary">
          <img
            src={book.image}
            alt={book.name}
            className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700 backdrop-blur-sm">
            {book.category}
          </span>
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
          <span>{book.inStock ? 'In stock' : 'Sold out'}</span>
          <span>{book.popular ? 'Popular' : 'New arrival'}</span>
        </div>

        <Link to={`/product/${book._id}`}>
          <h3 className="line-clamp-2 text-lg font-semibold text-slate-800 transition hover:text-violet-600">
            {book.name}
          </h3>
        </Link>

        <p className="line-clamp-3 text-sm text-slate-600">{book.description}</p>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-slate-900">${book.price}</span>
          </div>

          <button
            type="button"
            onClick={() => addBookToCart(book)}
            className="btn-secondary flex h-10 w-10 items-center justify-center p-0"
            aria-label={`Add ${book.name} to cart`}
            title="Add to cart"
          >
            <FiShoppingCart className="text-lg" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default BookCard
