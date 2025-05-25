// src/pages/Contact.jsx
import React, { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('پیام شما ارسال شد!')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">تماس با ما</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="نام" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input type="email" name="email" placeholder="ایمیل" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
        <textarea name="message" placeholder="پیام" value={form.message} onChange={handleChange} className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded">ارسال</button>
      </form>
    </div>
  )
}

export default Contact
