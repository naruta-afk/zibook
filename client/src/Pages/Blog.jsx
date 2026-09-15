import { blogs } from '../assets/data'

const Blog = () => {
  return (
    <div className="max-padd-container py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Insights</p>
        <h1 className="mt-2 h2">Bookish stories & inspiration</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {blogs.map((post) => (
          <article key={post.title} className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <img src={post.image} alt={post.title} className="h-64 w-full object-cover" />
            <div className="space-y-4 p-6">
              <span className="inline-flex rounded-full bg-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-700">
                {post.category}
              </span>
              <h3 className="text-2xl font-semibold text-slate-800">{post.title}</h3>
              <p>
                Discover thoughtful recommendations, reading habits, and ideas that help you find your next favorite book and enjoy every page.
              </p>
              <button type="button" className="btn-outline">Read more</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Blog
