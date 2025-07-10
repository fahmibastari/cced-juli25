import { Bell, ChevronDown, User as UserIcon, EditIcon, MenuIcon, LogOutIcon, PlusIcon } from "lucide-react";
import { signOut } from 'next-auth/react';
import Link from "next/dist/client/link";
import { useState } from "react";

interface UserDropdownProps {
  user: any;
  feedbacks: any[];
}

const UserDropdown = ({ user, feedbacks }: UserDropdownProps) => {
  const [open, setOpen] = useState(false);

  // TETAPIN DI ATAS:
const userImg =
user?.role === 'COMPANY'
  ? user?.companyLogo || "/default-thumbnail.jpg"
  : user?.img || "/default-thumbnail.jpg";

  const userName = user?.fullname || "User Name";
  const userStudyLevel = user?.studylevel || "";
  const userMajor = user?.major || "";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm hover:shadow-md border transition group focus:outline-none"
      >
        <div className="relative">
          <img
            src={userImg}
            alt="User"
            className="w-9 h-9 rounded-full object-cover"
          />
          {feedbacks.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-blue-500 to-green-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white shadow animate-pulse">
              <Bell className="h-3 w-3" />
            </span>
          )}
        </div>
        <span className="text-green-900 font-semibold max-w-[120px] truncate" title={userName}>
          {userName}
        </span>
        <ChevronDown className={`h-4 w-4 text-green-800 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-2 min-w-[230px] bg-white border border-gray-100/70 rounded-2xl shadow-xl py-2 z-50 animate-fade-in"
          onMouseLeave={() => setOpen(false)}
          style={{ animation: 'fadeIn 0.19s cubic-bezier(.44,2,.29,.98)' }}
        >
          <div className="flex items-center px-4 py-3 border-b">
            <img
              src={userImg}
              alt="User"
              className="w-10 h-10 rounded-full border ring-1 ring-green-300 mr-2 object-cover"
            />
            <div className="flex-1">
              <div className="font-bold text-green-800 text-base truncate max-w-[140px]" title={userName}>
                {userName}
              </div>
              {/* Hanya tampilkan study/major untuk member */}
              {user?.role === 'MEMBER' && (
                <div className="text-xs text-gray-500 truncate">{userStudyLevel} {userMajor}</div>
              )}
            </div>
          </div>

          {/* === MENU UNTUK MEMBER === */}
          {user?.role === 'MEMBER' && (
            <>
              <Link href="/member/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-sm text-green-900 transition">
                <UserIcon className="h-4 w-4" /> Lihat Profil
              </Link>
              <Link href="/member/edit-profile-member" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-sm text-green-900 transition">
                <EditIcon className="h-4 w-4" /> Edit Profil
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-sm text-green-900 transition">
                <MenuIcon className="h-4 w-4" /> Dashboard
              </Link>
            </>
          )}

          {/* === MENU UNTUK COMPANY === */}
          {user?.role === 'COMPANY' && (
            <>
              <Link href="/company/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-sm text-green-900 transition">
                <UserIcon className="h-4 w-4" /> Lihat Profil
              </Link>
              <Link href="/company/edit-profile-company" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-sm text-green-900 transition">
                <EditIcon className="h-4 w-4" /> Edit Profil
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-sm text-green-900 transition">
                <MenuIcon className="h-4 w-4" /> Dashboard
              </Link>
              <Link href="/company/add-job" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-sm text-green-900 transition">
                <PlusIcon className="h-4 w-4" /> Tambah Lowongan
              </Link>
            </>
          )}

          {/* === MENU UNTUK ADMIN (Optional) === */}
          {user?.role === 'ADMIN' && (
            <>
              <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 hover:bg-green-50 text-sm text-green-900 transition">
                <MenuIcon className="h-4 w-4" /> Dashboard
              </Link>
            </>
          )}

          {/* Logout */}
          <form onClick={() => signOut({ callbackUrl: '/' })} method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-sm text-red-600 transition text-left"
            >
              <LogOutIcon className="h-4 w-4" /> Keluar
            </button>
          </form>

          {/* Feedback section */}
          {feedbacks.length > 0 && (
            <div className="px-4 py-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold shadow">
                {feedbacks.length} Feedback Baru
              </span>
            </div>
          )}
        </div>
      )}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.18s cubic-bezier(.44,2,.29,.98);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default UserDropdown;
