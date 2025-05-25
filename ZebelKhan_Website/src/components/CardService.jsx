import React from 'react'

function CardService({ title, description, icon }) {
  return (
    <div className="border rounded-2xl shadow-sm p-4 text-center hover:shadow-md transition-all">
      <div className="text-green-600 text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

export default CardService
