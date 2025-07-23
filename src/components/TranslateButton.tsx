import React, { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Menggunakan useRouter dari Next.js

const DOMAIN = "cced--juli25.vercel.app"; // Ganti ke domain asli saat deploy

export default function TranslateButton() {
  const [currentURL, setCurrentURL] = useState(""); // Menyimpan URL halaman saat ini
  const [isClient, setIsClient] = useState(false); // Untuk memastikan kode hanya dijalankan di sisi klien
  const [router, setRouter] = useState<any>(null); // State untuk menyimpan router setelah mount
  const nextRouter = useRouter(); // Mengambil router dari Next.js

  // Hanya jalankan kode ini di sisi klien
  useEffect(() => {
    setIsClient(true); // Menandakan bahwa ini dijalankan di sisi klien
    setRouter(nextRouter); // Set router setelah komponen dimuat
    setCurrentURL(window.location.href); // Set URL saat ini
  }, [nextRouter]);

  // Menunggu router untuk dipasang dan memastikan itu berjalan di klien
  const TRANSLATE_URL = isClient && router
    ? `https://${DOMAIN.replace(/\./g, "-")}.translate.goog${router.asPath}?_x_tr_sl=id&_x_tr_tl=en&_x_tr_hl=id&_x_tr_pto=wapp&_x_tr_hist=true`
    : "#"; // Placeholder jika router belum tersedia

  return (
    <a
      href={TRANSLATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Translate to English"
      className="
        flex items-center gap-2
        hover:from-blue-600 hover:to-sky-500
        active:scale-95
        text-white rounded-full shadow-md
        px-4 py-2
        font-semibold
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-blue-300
        select-none
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        fill="none"
        viewBox="0 0 24 24"
        className="w-5 h-5 text-white"
      >
        <path
          fill="green"
          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm7.938 9H17.9a8.032 8.032 0 00-1.397-4.362A8.01 8.01 0 0119.938 11zM12 20c-1.68 0-3.169-2.671-3.584-6h7.168C15.169 17.329 13.68 20 12 20zm-4.501-8a8.07 8.07 0 01.863-4.331A7.988 7.988 0 004.062 11H7.5zm1.079 2c.286 2.473 1.096 4.253 1.876 5.272.295.391.629.728.986.984.358-.256.692-.593.986-.984.78-1.019 1.59-2.799 1.876-5.272H8.579zm8.02 0h3.438a7.988 7.988 0 01-4.362 4.331c.384-.697.71-1.591.939-2.655A11.784 11.784 0 0016.599 12zm-4.599-8c1.68 0 3.169 2.671 3.584 6H7.417C7.831 6.671 9.32 4 12 4zm0 2.744c-.212 0-.414.027-.603.074a7.89 7.89 0 00-1.584 1.033C9.693 7.05 10.833 6.744 12 6.744zm-4.031.894A8.032 8.032 0 007.417 10H4.062A7.988 7.988 0 007.969 7.638zm6.498.074A7.893 7.893 0 0012 6.744c1.167 0 2.307.306 3.187.858a7.893 7.893 0 00-1.584-1.033c-.19-.047-.391-.074-.603-.074zm2.565 1.252A8.07 8.07 0 0115.421 10h3.438a7.988 7.988 0 00-3.327-3.331zm-4.053 3.331a1 1 0 110-2 1 1 0 010 2zm2.053 0a1 1 0 110-2 1 1 0 010 2z"
        />
      </svg>
    </a>
  );
}
