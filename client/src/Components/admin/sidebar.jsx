import { NavLink, useNavigate } from 'react-router-dom'
import { FaBagShopping, FaChartLine, FaList, FaPlus, FaRightFromBracket } from 'react-icons/fa6'
import { useAuth } from '../../context/AuthContext'

const navigationItems = [
	{ label: 'Dashboard', to: '/admin/dashboard', icon: FaChartLine },
	{ label: 'Add Item', to: '/admin/add-item', icon: FaPlus },
	{ label: 'List', to: '/admin/list', icon: FaList },
	{ label: 'Orders', to: '/admin/orders', icon: FaBagShopping },
]

const Sidebar = ({ isOpen = true, onClose }) => {
	const { logout } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/admin')
	}

	return (
		<aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white px-5 py-6 shadow-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
			<div className="flex items-center justify-between px-3">
				<div>
					<p className="text-xl font-bold text-slate-900">Zibook<span className="text-violet-500">.</span></p>
					<p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Admin panel</p>
				</div>
				<button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden" aria-label="Close sidebar">
					×
				</button>
			</div>

			<nav className="mt-10 flex-1 space-y-2" aria-label="Admin navigation">
				{navigationItems.map(({ label, to, icon: Icon }) => (
					<NavLink
						key={to}
						to={to}
						onClick={onClose}
						className={({ isActive }) => `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-violet-100 text-violet-700' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
					>
						<Icon className="text-base" aria-hidden="true" />
						{label}
					</NavLink>
				))}
			</nav>

			<div className="border-t border-slate-200 pt-4">
				<button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50">
					<FaRightFromBracket aria-hidden="true" />
					Logout
				</button>
			</div>
		</aside>
	)
}

export default Sidebar
