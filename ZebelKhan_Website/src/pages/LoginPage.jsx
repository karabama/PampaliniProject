import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { t } = useTranslation()
  const [nationalCode, setNationalCode] = useState('')
  const [password, setPassword] = useState('')
  const [userType, setUserType] = useState('basic')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nationalCode, password, userType }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.message || 'خطا در ورود')
        setLoading(false)
        return
      }
      // ذخیره توکن در localStorage یا state
      localStorage.setItem('token', data.token)
      setLoading(false)
      // ریدایرکت بر اساس نوع کاربر
      if (userType === 'admin') {
        navigate('/admin/dashboard')
      } else if (userType === 'agent') {
        navigate('/dashboard/agent')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('ارتباط با سرور برقرار نشد')
      setLoading(false)
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{t('login')}</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder={t('national_code', 'کد ملی')}
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="basic">{t('user', 'کاربر')}</option>
          <option value="agent">{t('agent', 'عامل')}</option>
          <option value="admin">{t('admin', 'مدیر')}</option>
        </select>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? t('loading', 'در حال ورود...') : t('login')}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
          onClick={() => navigate('/signup')}
        >
          {t('no_account_signup', 'حساب کاربری ندارید؟ ثبت‌نام')}
        </button>
      </div>
    </div>
  )
}

export default LoginPage
