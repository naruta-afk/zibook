import React from 'react'

const Title = ({ eyebrow, title, subtitle, action }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">{eyebrow}</p>
        )}
        {title && <h2 className="mt-2 h2">{title}</h2>}
        {subtitle && <p className="mt-2 max-w-2xl text-slate-600">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export default Title