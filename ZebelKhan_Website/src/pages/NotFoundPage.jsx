import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-5xl font-bold mb-4 text-red-600">404</h1>
      <p className="text-lg mb-6">صفحه مورد نظر یافت نشد.</p>
      <Link to="/" className="text-green-600 underline">بازگشت به صفحه اصلی</Link>
    </div>
  )
}

export default NotFoundPage
