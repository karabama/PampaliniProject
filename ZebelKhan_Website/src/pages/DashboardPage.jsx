import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar'

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold mb-4">داشبورد مدیریت</h2>
        <p>اینجا می‌توانید خدمات، کاربران و گزارشات را مدیریت کنید.</p>
      </div>
    </div>
  )
}

export default DashboardPage
