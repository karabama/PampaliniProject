import React from 'react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-100 text-center text-sm p-4 mt-10">
      <p className="text-gray-600">&copy; 2025 Zebel Khan. {t('all_rights_reserved')}.</p>
    </footer>
  )
}

export default Footer
