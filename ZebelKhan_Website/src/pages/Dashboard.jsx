import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'

const DashboardPage = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">داشبورد مدیریت</h2>
        <p>اینجا می‌توانید خدمات، کاربران و گزارشات را مدیریت کنید.</p>
        <button className="mt-8 bg-red-600 text-white px-4 py-2 rounded" onClick={handleLogout}>خروج</button>
      </div>
    </div>
  )
}

export default DashboardPage
