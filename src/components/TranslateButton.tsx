import React, { useState } from "react";

const DOMAIN = "cced-juli25.vercel.app"; // Ganti ke domain asli saat deploy
const API_KEY = "213974bd-ec20-48e9-8233-9f5835da5b67:fx"; // Ganti dengan API key kamu

const TranslateButton = () => {
  const [translatedUrl, setTranslatedUrl] = useState("");

  // Fungsi untuk membuat URL terjemahan
  const getTranslatedUrl = async () => {
    const currentPage = window.location.pathname.split("/").pop() || "home"; // Mengambil halaman yang sedang dibuka
    
    // Memanggil API DeepL
    const response = await fetch(`https://api-free.deepl.com/v2/translate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        auth_key: API_KEY,
        text: currentPage,
        source_lang: "ID",
        target_lang: "EN",
      }),
    });

    const data = await response.json();
    if (data.translations && data.translations[0]) {
      const translatedText = data.translations[0].text;
      setTranslatedUrl(`https://${DOMAIN.replace(/\./g, "-")}.translate.goog/${translatedText}?_x_tr_sl=id&_x_tr_tl=en&_x_tr_hl=id&_x_tr_pto=wapp`);
    }
  };

  return (
    <a
      href={translatedUrl || "#"} // Jika URL belum tersedia, tetap tidak mengarah kemana-mana
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
      onClick={getTranslatedUrl}
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
};

export default TranslateButton;
