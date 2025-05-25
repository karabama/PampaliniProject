import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import NotFoundPage from './pages/NotFoundPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SignupPage from './pages/SignupPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useTranslation } from 'react-i18next'
import './i18n/i18n'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  const { t } = useTranslation()

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-white text-gray-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
