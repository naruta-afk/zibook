import React, { useState } from 'react'
import userAvatar from '../assets/user.png'
import bgTexture from '../assets/bg.png'

const Login = ({ isOpen, onClose, onLogin, onRegister }) => {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Please enter your name.')
        return
      }

      if (password.length < 6) {
        setError('Your password must contain at least 6 characters.')
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }

      onRegister?.({ name, email, password })
      return
    }

    onLogin?.({ email, password })
  }

  const switchMode = () => {
    setMode((currentMode) => currentMode === 'login' ? 'register' : 'login')
    setError('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        <img src={bgTexture} alt="decor" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg text-slate-700 shadow"
        >
          ×
        </button>

        <div className="relative grid md:grid-cols-2">
          <div className="bg-gradient-to-br from-violet-100 via-white to-yellow-100 p-8">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
              <img src={userAvatar} alt="user" className="h-12 w-12 object-cover" />
            </div>
            <h3 className="text-3xl font-bold text-slate-800">{mode === 'login' ? 'Welcome back' : 'Join Zibook'}</h3>
            <p className="mt-3 text-slate-600">
              {mode === 'login' ? 'Sign in to track your orders and discover your next favorite read.' : 'Create an account to save favorites and follow your orders.'}
            </p>
          </div>

          <form className="bg-white p-8" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" autoComplete="name" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
              </label>
            )}

            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300"
              />
            </label>

            <label className="mb-4 block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300"
              />
            </label>

            {mode === 'register' && (
              <label className="mb-4 block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Confirm password</span>
                <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Repeat your password" autoComplete="new-password" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-violet-300" />
              </label>
            )}

            {error && <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <button type="submit" className="btn-secondary w-full">{mode === 'login' ? 'Login' : 'Create account'}</button>
            <div className="mt-4 text-center text-sm text-slate-500">
              {mode === 'login' ? 'New member?' : 'Already a member?'}{' '}
              <button type="button" onClick={switchMode} className="font-semibold text-violet-600">
                {mode === 'login' ? 'Create account' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login