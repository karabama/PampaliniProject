import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const DashboardSidebar = () => {
  const location = useLocation()

  const menu = [
    { path: '/dashboard', label: 'داشبورد' },
    { path: '/dashboard/reports', label: 'گزارشات' },
    { path: '/dashboard/services', label: 'مدیریت خدمات' },
  ]

  return (
    <aside className="w-60 bg-gray-100 p-4 h-full border-r border-gray-300">
      <h2 className="text-lg font-bold mb-4">مدیریت</h2>
      <ul className="space-y-2">
        {menu.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block p-2 rounded hover:bg-green-100 ${
                location.pathname === item.path ? 'bg-green-200 font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default DashboardSidebar
