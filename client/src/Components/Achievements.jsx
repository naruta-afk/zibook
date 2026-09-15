import React from 'react'

const stats = [
  { value: '12k+', label: 'Happy readers', accent: 'text-violet-600' },
  { value: '4.9/5', label: 'Average rating', accent: 'text-sky-600' },
  { value: '120+', label: 'Curated titles', accent: 'text-amber-600' },
]

const Achievements = () => {
  return (
    <section className="max-padd-container py-10">
      <div className="grid gap-5 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[22px] bg-primary p-5 text-center">
            <div className={`text-3xl font-bold md:text-4xl ${stat.accent}`}>{stat.value}</div>
            <p className="mt-2 text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Achievements