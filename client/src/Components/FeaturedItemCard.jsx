const FeaturedItemCard = () => {
  return (
    <div className="relative flex w-full items-center justify-center py-4 lg:justify-end">
      <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-[#b888f7] blur-[1px]" />
      <div className="relative z-10 w-full max-w-[280px] rounded-[24px] bg-white p-3 shadow-[0_24px_50px_rgba(91,72,128,0.15)]">
        <div className="overflow-hidden rounded-[20px] bg-gradient-to-br from-[#eb2d2d] via-[#d32a2a] to-[#7f0d0d] p-4 text-white">
          <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-red-100">
            <span>Event</span>
            <span>Limited</span>
          </div>

          <h3 className="text-3xl font-black uppercase leading-none tracking-[-0.08em]">
            Spooky
            <br />
            Night
          </h3>

          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-red-100">
            Halloween party
          </p>

          <div className="mt-5 rounded-[14px] bg-[#f8efef]/10 p-2 backdrop-blur-sm">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-red-100">
              <span>31st</span>
              <span>Oct</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] font-bold tracking-[0.12em] text-white">
              <span>Monster Club</span>
              <span>2025</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h4 className="text-xl font-bold text-slate-800">The Haunted Woods</h4>
              <p className="mt-1 text-sm text-slate-500">Mysterious events unfold in a forest</p>
            </div>
            <span className="text-xl font-bold text-slate-800">$25.00</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-slate-600">Where no one returns once they enter after sunset.</span>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-lg text-white shadow-sm transition hover:bg-violet-600"
              aria-label="Add item to cart"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedItemCard
