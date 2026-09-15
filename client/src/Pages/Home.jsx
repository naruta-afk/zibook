import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { categories, dummyBooks } from '../assets/data'
import Categories from '../Components/Categories'
import heroBackground from '../assets/bg.png'
import { useCart } from '../context/CartContext'

const featuredBooks = dummyBooks.filter((book) => book.popular).slice(0, 7)
const popularProducts = dummyBooks.filter((book) => book.popular).slice(0, 5)

const Home = () => {
  const { addToCart } = useCart()

  return (
    <div className="pb-16">
      <section className="max-padd-container py-8 md:py-12">
        <div
          className="relative min-h-[560px] overflow-hidden rounded-[30px] bg-[#e7f2f3] bg-cover bg-center shadow-[0_20px_60px_rgba(172,129,253,0.12)]"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="relative z-10 flex min-h-[560px] items-center px-7 py-10 md:px-10 lg:px-12">
            <div className="max-w-2xl space-y-5">
              <p className="text-lg font-semibold text-violet-500 md:text-xl">Explore Books You&apos;ll Love</p>
              <h1 className="max-w-xl text-4xl font-bold leading-[1.05] text-slate-900 md:text-6xl">Find Your Next Book</h1>
              <h2 className="text-2xl font-bold text-slate-800 md:text-4xl">Up To 40% Off This Week</h2>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                Discover the joy of reading with our carefully curated collection of books. Whether you&apos;re searching for the latest bestsellers, timeless classics, or hidden gems, we have something for every reader.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-4 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50">
                Check our latest stock
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xl text-white">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-padd-container py-10">
        <Categories items={categories.map((category) => ({ ...category, count: dummyBooks.filter((book) => book.category === category.name).length }))} />
      </section>

      <section className="max-padd-container py-10">
        <div className="mb-6">
          <h2 className="text-[30px] font-bold tracking-[-0.04em] text-slate-800 md:text-[36px]">
            New <span className="font-normal underline decoration-slate-500 underline-offset-2">Arrivals</span>
          </h2>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500 md:text-sm">
            Check out our newest books arriving weekly with fresh ideas, exciting plots, and vibrant voices
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {dummyBooks.slice(0, 5).map((book, index) => {
            const cardStyles = ['bg-[#e7f1f0]', 'bg-[#edf3f1]', 'bg-[#e8f1f0]', 'bg-[#e9f2f1]', 'bg-[#e6f0ef]']

            return (
              <article key={book._id} className={`group overflow-hidden rounded-[8px] border border-slate-200/80 p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${cardStyles[index]}`}>
                <Link to={`/product/${book._id}`} className="block overflow-hidden rounded-[5px] bg-white/60">
                  <img src={book.image} alt={book.name} className="h-[210px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                </Link>

                <div className="px-1 pb-1 pt-2">
                  <div className="flex items-center justify-between gap-2">
                    <Link to={`/product/${book._id}`} className="min-w-0">
                      <h3 className="truncate text-xs font-bold text-slate-800 md:text-sm">{book.name}</h3>
                    </Link>
                    <span className="shrink-0 text-xs font-semibold text-violet-500">${book.price}.00</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="truncate text-[10px] text-slate-500 md:text-xs">{book.description}</p>
                    <button
                      type="button"
                      onClick={() => addToCart(book)}
                      className="shrink-0 text-slate-700 transition hover:text-violet-600"
                      aria-label={`Add ${book.name} to cart`}
                      title="Add to cart"
                    >
                      <FiShoppingCart className="text-sm" />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="max-padd-container py-10">
        <div className="overflow-hidden rounded-[24px] bg-[#e6f1f2] p-5 shadow-sm md:p-7">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-800 md:text-3xl">
              Featured <span className="font-normal underline decoration-slate-500 underline-offset-2">Books</span>
            </h2>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500 md:text-sm">
              Browse featured books carefully selected for quality, imagination, storytelling, and unique characters
            </p>
          </div>

          {featuredBooks[0] && (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <article className="grid gap-5 rounded-[12px] bg-white p-3 shadow-sm sm:grid-cols-[125px_1fr] sm:p-4">
                <Link to={`/product/${featuredBooks[0]._id}`} className="overflow-hidden rounded-[10px] bg-slate-100">
                  <img src={featuredBooks[0].image} alt={featuredBooks[0].name} className="h-44 w-full object-cover sm:h-[175px]" />
                </Link>
                <div className="flex flex-col justify-center">
                  <Link to={`/product/${featuredBooks[0]._id}`}>
                    <h3 className="text-lg font-bold text-slate-800">{featuredBooks[0].name}</h3>
                  </Link>
                  <p className="mt-1 text-xs text-slate-500">{featuredBooks[0].category}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="text-lg font-bold text-violet-500">${featuredBooks[0].price}.00</span>
                    <span className="text-xs text-slate-400 line-through">${featuredBooks[0].price + 10}.00</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-semibold text-emerald-700">Save 5</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-500">
                    <span>Published: 2023</span>
                    <span>Pages: 300</span>
                    <span>Language: English</span>
                    <span>Stock: In Stock</span>
                  </div>
                  <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-500">{featuredBooks[0].description}</p>
                  <button
                    type="button"
                    onClick={() => addToCart(featuredBooks[0])}
                    className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-violet-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-600"
                  >
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </article>

              <div className="grid grid-cols-3 gap-3">
                {featuredBooks.slice(1).map((book) => (
                  <Link key={book._id} to={`/product/${book._id}`} className="group overflow-hidden rounded-[8px] bg-white shadow-sm">
                    <img src={book.image} alt={book.name} className="h-32 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-36" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="max-padd-container py-10">
        <div className="mb-6">
          <h2 className="text-[30px] font-bold tracking-[-0.04em] text-slate-800 md:text-[36px]">
            Popular <span className="font-normal underline decoration-slate-500 underline-offset-2">Products</span>
          </h2>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500 md:text-sm">
            Explore our top-selling books loved for their powerful stories, creative writing, and lasting impact.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {popularProducts.map((book, index) => {
            const cardStyles = ['bg-[#e7f1f0]', 'bg-[#edf3f1]', 'bg-[#e8f1f0]', 'bg-[#e9f2f1]', 'bg-[#e6f0ef]']

            return (
              <article key={book._id} className={`group overflow-hidden rounded-[8px] border border-slate-200/80 p-2 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${cardStyles[index]}`}>
                <Link to={`/product/${book._id}`} className="block overflow-hidden rounded-[5px] bg-white/60">
                  <img src={book.image} alt={book.name} className="h-[210px] w-full object-cover transition duration-300 group-hover:scale-[1.03]" />
                </Link>

                <div className="px-1 pb-1 pt-2">
                  <div className="flex items-center justify-between gap-2">
                    <Link to={`/product/${book._id}`} className="min-w-0">
                      <h3 className="truncate text-xs font-bold text-slate-800 md:text-sm">{book.name}</h3>
                    </Link>
                    <span className="shrink-0 text-xs font-semibold text-violet-500">${book.price}.00</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="truncate text-[10px] text-slate-500 md:text-xs">{book.description}</p>
                    <button
                      type="button"
                      onClick={() => addToCart(book)}
                      className="shrink-0 text-slate-700 transition hover:text-violet-600"
                      aria-label={`Add ${book.name} to cart`}
                      title="Add to cart"
                    >
                      <FiShoppingCart className="text-sm" />
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="max-padd-container pb-10 pt-4">
        <div className="grid overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm lg:grid-cols-[1.7fr_0.8fr]">
          <div className="bg-[#fff8dc] px-6 py-10 md:px-10">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-slate-800 md:text-3xl">Our Journey So Far</h2>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-500 md:text-sm">
              We connect readers with thoughtful stories, useful ideas, and books that stay with them long after the final page.
            </p>
            <div className="mt-8 grid max-w-md grid-cols-3 gap-5">
              <div>
                <strong className="text-3xl font-normal text-slate-800">15k+</strong>
                <p className="mt-1 text-[10px] text-slate-500">Happy Clients</p>
              </div>
              <div>
                <strong className="text-3xl font-normal text-slate-800">29k</strong>
                <p className="mt-1 text-[10px] text-slate-500">Books Stock</p>
              </div>
              <div>
                <strong className="text-3xl font-normal text-slate-800">45k+</strong>
                <p className="mt-1 text-[10px] text-slate-500">Total Sales</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-10 md:px-10">
            <h2 className="text-2xl font-bold text-slate-800">About <span className="font-normal underline decoration-slate-500 underline-offset-2">Us</span></h2>
            <ul className="mt-6 space-y-4 text-xs text-slate-500">
              <li><strong className="block text-slate-700">Fast &amp; Secure</strong>Optimized performance</li>
              <li><strong className="block text-slate-700">Advanced Filtering</strong>Find items quickly</li>
              <li><strong className="block text-slate-700">User Reviews</strong>Ratings &amp; feedback</li>
              <li><strong className="block text-slate-700">Order Tracking</strong>Live order status</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
