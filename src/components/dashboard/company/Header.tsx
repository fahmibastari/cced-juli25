interface HeaderProps {
  handleClickEdit: () => void
  companyName: string
  industri: string
  // logo: string
}

const Header = ({ handleClickEdit, companyName, industri }: HeaderProps) => {
  return (
    <div className='flex items-center justify-between bg-gray-100 p-4'>
      <div className='flex items-center gap-4'>
        <div className='h-12 w-12 rounded-full bg-gray-300' />
        <div>
          <h2 className='text-lg font-bold'>{companyName}</h2>
          <p className='text-sm'>{industri}</p>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <button
          onClick={handleClickEdit}
          className='rounded-lg border px-4 py-2'
        >
          Edit Profil Perusahaan
        </button>
      </div>
    </div>
  )
}

export default Header
