'use client'

import Sidebar from './Sidebar'
import DashboardContent from './utils/DashboardContent'
import Header from './utils/Header'
import LibraryContent from './utils/LibraryContent'
import NewsArticleContent from './utils/NewsArticleContent'
import {
  BarChart3,
  Briefcase,
  Building2,
  FileText,
  LayoutGrid,
  Library,
  Share2,
  Users,
} from 'lucide-react'
import { useState } from 'react'

const DashboardAdmin = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'library', label: 'Kelola Library', icon: Library },
    { id: 'content', label: 'Konten', icon: FileText },
    { id: 'companies', label: 'Perusahaan', icon: Building2 },
    { id: 'users', label: 'Pengguna', icon: Users },
    { id: 'jobs', label: 'Lowongan', icon: Briefcase },
    { id: 'stats', label: 'Statistik', icon: BarChart3 },
    { id: 'social', label: 'Media Sosial', icon: Share2 },
  ]

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <Sidebar
        menuItems={menuItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {/* Main Content */}

      <div className='flex-1 overflow-auto'>
        {/* Header */}
        <Header
          title={
            menuItems.find((item) => item.id === activeSection)?.label ||
            'Default Title'
          }
        />

        <main className='p-6'>
          {activeSection === 'dashboard' && <DashboardContent />}

          {activeSection === 'library' && <LibraryContent />}

          {activeSection === 'content' && <NewsArticleContent />}
        </main>
      </div>
    </div>
  )
}

export default DashboardAdmin
