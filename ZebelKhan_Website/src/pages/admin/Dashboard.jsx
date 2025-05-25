// src/pages/admin/Dashboard.jsx
import React from 'react'

const Dashboard = () => {
  const stats = {
    totalRequests: 128,
    pending: 24,
    completed: 90,
    rejected: 14
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">داشبورد مدیریت</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">تعداد کل درخواست‌ها: {stats.totalRequests}</div>
        <div className="bg-white p-4 shadow rounded">در انتظار بررسی: {stats.pending}</div>
        <div className="bg-white p-4 shadow rounded">تکمیل‌شده‌ها: {stats.completed}</div>
        <div className="bg-white p-4 shadow rounded">رد شده‌ها: {stats.rejected}</div>
      </div>
    </div>
  )
}

export default Dashboard
