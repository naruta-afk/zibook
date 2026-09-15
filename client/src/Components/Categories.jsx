import React from 'react'
import { Link } from 'react-router-dom'

import academic from '../assets/categories/academic.png'
import children from '../assets/categories/children.png'
import health from '../assets/categories/health.png'
import horror from '../assets/categories/horror.png'
import business from '../assets/categories/business.png'
import history from '../assets/categories/history.png'
import adventure from '../assets/categories/adventure.png'

const categoryStyles = [
  { bg: 'bg-[#cfe4ee]', image: academic },
  { bg: 'bg-[#f1e2b7]', image: children },
  { bg: 'bg-[#f2c8d0]', image: health },
  { bg: 'bg-[#cfe3e8]', image: horror },
  { bg: 'bg-[#f7d7af]', image: business },
  { bg: 'bg-[#f2d0d7]', image: history },
  { bg: 'bg-[#e9d7f6]', image: adventure },
]

const Categories = ({ items = [] }) => {
  if (!items.length) return null

  return (
    <div className="space-y-5">
      <div className="flex items-end gap-2">
        <h2 className="text-[36px] font-bold tracking-[-0.05em] text-slate-800">Category</h2>
        <span className="pb-2 text-[16px] font-medium text-slate-500">List</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
        {items.map((category, index) => {
          const categoryStyle = categoryStyles[index % categoryStyles.length]
          const cardBg = categoryStyle.bg
          const categoryImage = category.image || categoryStyle.image

          return (
            <Link
              key={category.name}
              to={`/shop/${category.name.toLowerCase()}`}
              className={`group flex min-h-[150px] flex-col items-center justify-center rounded-[20px] ${cardBg} p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-slate-800/20 bg-white/30">
                <img
                  src={categoryImage}
                  alt={category.name}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <h3 className="text-lg font-medium text-slate-800">{category.name}</h3>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Categories
