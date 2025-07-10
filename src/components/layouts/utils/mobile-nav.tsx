// MobileNav.tsx
import Link from "next/link";
import { X, Bell, User as UserIcon, EditIcon, LogOutIcon, PlusCircle, MenuIcon } from "lucide-react";

interface MobileNavProps {
  items: { label: string; href: string }[];
  user?: any;
  feedbacks?: any[];
  onClose?: () => void;
}

const MobileNav = ({ items, onClose, user, feedbacks = [] }: MobileNavProps) => {
  // Pilih avatar user
  const userImg = user?.role === 'COMPANY'
    ? user?.companyLogo || "/default-thumbnail.jpg"
    : user?.img || "/default-thumbnail.jpg";

  return (
    <div className="flex flex-col h-full px-6 pt-6 pb-10 bg-white">
      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button onClick={onClose} aria-label="Tutup menu">
          <X className="h-6 w-6 text-green-800" />
        </button>
      </div>
      
      {/* Main Menu */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="text-green-800 font-semibold text-base py-2 border-b border-gray-100 hover:bg-green-50 rounded-md transition"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* User profile */}
      {user && (
        <div className="mt-8 pt-4 border-t flex flex-col items-center animate-fade-in">
          <div className="relative">
            <img
              src={userImg || "/default-thumbnail.jpg"}
              alt="User"
              className="w-16 h-16 rounded-full border-2 border-green-400 object-cover shadow-lg"
            />
            {feedbacks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-blue-500 to-green-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center ring-2 ring-white shadow animate-pulse">
                <Bell className="h-4 w-4" />
              </span>
            )}
          </div>
          <span className="mt-3 font-bold text-green-900 text-base">{user.fullname}</span>
{/* Jika member */}
          {(user.studylevel || user.major) && user.role !== "COMPANY" ? (
            <span className="text-xs text-gray-500 mt-0.5 text-center">
              {user.studylevel} {user.major}
            </span>
          ) : null}
          
          {/* Feedback info */}
          {feedbacks.length > 0 && (
            <span className="mt-2 bg-blue-100 text-blue-700 text-xs rounded-full px-3 py-0.5 shadow font-bold">
              {feedbacks.length} Feedback Baru
            </span>
          )}

{/* User actions */}
<div className="flex flex-col gap-2 mt-5 w-full">
            {/* === Menu untuk MEMBER === */}
            {user.role === "MEMBER" && (
              <>
                <Link
                  href="/member/profile"
                  onClick={onClose}
                  className="block text-green-800 py-2 px-3 rounded-lg hover:bg-green-50 transition text-sm text-center font-semibold"
                >
                  <UserIcon className="h-4 w-4 mr-1 inline" /> Lihat Profil
                </Link>
                <Link
                  href="/member/edit-profile-member"
                  onClick={onClose}
                  className="block text-green-800 py-2 px-3 rounded-lg hover:bg-green-50 transition text-sm text-center font-semibold"
                >
                  <EditIcon className="h-4 w-4 mr-1 inline" /> Edit Profil
                </Link>
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="block text-green-800 py-2 px-3 rounded-lg hover:bg-green-50 transition text-sm text-center font-semibold"
                >
                  <MenuIcon className="h-4 w-4 mr-1 inline" /> Dashboard
                </Link>
              </>
            )}

            {/* === Menu untuk COMPANY === */}
            {user.role === "COMPANY" && (
              <>
                <Link
                  href="/company/profile"
                  onClick={onClose}
                  className="block text-green-800 py-2 px-3 rounded-lg hover:bg-green-50 transition text-sm text-center font-semibold"
                >
                  <UserIcon className="h-4 w-4 mr-1 inline" /> Lihat Profil Perusahaan
                </Link>
                <Link
                  href="/company/edit-profile-company"
                  onClick={onClose}
                  className="block text-green-800 py-2 px-3 rounded-lg hover:bg-green-50 transition text-sm text-center font-semibold"
                >
                  <EditIcon className="h-4 w-4 mr-1 inline" /> Edit Profil
                </Link>
                <Link
                  href="/company/add-job"
                  onClick={onClose}
                  className="block text-green-800 py-2 px-3 rounded-lg hover:bg-green-50 transition text-sm text-center font-semibold"
                >
                  <PlusCircle className="h-4 w-4 mr-1 inline" /> Tambah Lowongan
                </Link>
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="block text-green-800 py-2 px-3 rounded-lg hover:bg-green-50 transition text-sm text-center font-semibold"
                >
                  <UserIcon className="h-4 w-4 mr-1 inline" /> Dashboard
                </Link>
              </>
            )}

            <form action="/api/auth/signout" method="POST" className="w-full">
              <button
                type="submit"
                className="w-full text-red-600 py-2 px-3 rounded-lg hover:bg-red-50 transition text-sm text-center font-semibold"
              >
                <LogOutIcon className="h-4 w-4 mr-1 inline" /> Logout
              </button>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.19s cubic-bezier(.44,2,.29,.98);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-16px);}
          to   { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
};

export default MobileNav;
