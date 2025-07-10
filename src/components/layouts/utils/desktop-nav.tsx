// DesktopNav.tsx
import Link from "next/link";
import UserDropdown from './UserDropdown'; // Import komponen baru
import { Button } from "@react-email/components";

interface DesktopNavProps {
  items: { label: string; href: string }[];
  user?: any;
  feedbacks?: any[];
}

const DesktopNav = ({ items, user, feedbacks = [] }: DesktopNavProps) => {
  return (
    <div className="hidden md:flex gap-6 items-center">
      {/* Menu links */}
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="font-semibold text-green-800 px-4 py-2 rounded-xl hover:bg-green-50/80 transition-all"
        >
          {item.label}
        </Link>
      ))}

      {/* User dropdown */}
      {user && <UserDropdown user={user} feedbacks={feedbacks} />}
    </div>
  );
};

export default DesktopNav;
