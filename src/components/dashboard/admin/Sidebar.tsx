'use client'

import { ForwardRefExoticComponent, SVGProps } from 'react'

interface SidebarProps {
  menuItems: {
    id: string
    label: string
    icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>> // Proper type for icons
  }[]
  activeSection: string
  setActiveSection: (section: string) => void
}

const Sidebar = ({
  menuItems,
  activeSection,
  setActiveSection,
}: SidebarProps) => {
  return (
    <div className='w-64 bg-white shadow-lg'>
      <div className='border-b p-4'>
        <h1 className='text-center text-xl font-bold text-[#025908]'>
          Admin Panel
        </h1>
      </div>
      <nav className='p-4'>
        {menuItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`mb-2 flex w-full items-center rounded-lg p-3 text-left ${
              activeSection === id
                ? 'bg-green-50 text-green-600'
                : 'hover:bg-gray-50'
            }`}
          >
            {Icon && <Icon className='mr-2 h-5 w-5' />}{' '}
            {/* Render the icon as a component */}
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
