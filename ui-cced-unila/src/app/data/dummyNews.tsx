// types/news.ts
export interface NewsItem {
    id: string;
    date: string;
    title: string;
    content: string;
    image: string;
    category: string;
  }
  
  export interface NewsData {
    featuredNews: NewsItem;
    news: NewsItem[];
  }
  
  // data/dummyNews.ts
  export const dummyNewsData: NewsData = {
    featuredNews: {
      id: "1",
      date: "28/10/2024",
      title: "Unila Komitmen Penuh Hak Pendidikan untuk Penyandang Disabilitas",
      content: "(Unila): Sebagai institusi pendidikan, Universitas Lampung (Unila) berkomitmen untuk menjamin akses pendidikan bagi semua lapisan masyarakat, termasuk mahasiswa penyandang disabilitas. Komitmen ini diwujudkan melalui kegiatan sosialisasi dan Penghormatan, Perlindungan, dan Pemenuhan Hak Penyandang Disabilitas di Sektor Pendidikan.",
      image: "/images/featured-news.jpg",
      category: "Berita Utama"
    },
    news: [
      {
        id: "2",
        date: "27/10/2024",
        title: "Unila Gelar Workshop Transformasi Digital Wujudkan Satu Data University",
        content: "UPPTI dan Subag Informasi dan Komunikasi menyelenggarakan workshop transformasi digital untuk mewujudkan sistem satu data yang terintegrasi di lingkungan Universitas Lampung.",
        image: "/images/featured-news.jpg",
        category: "Berita Utama"
      },
      {
        id: "3",
        date: "26/10/2024",
        title: "LP3M Adakan Lokakarya Penyusunan 94 Serkom Baru LSP P1 Unila",
        content: "Lembaga Pengembangan Pembelajaran dan Penjaminan Mutu (LP3M) Unila mengadakan lokakarya untuk menyusun 94 skema sertifikasi kompetensi baru yang akan diimplementasikan oleh LSP P1 Unila.",
        image: "/images/featured-news.jpg",
        category: "Berita Utama"
      },
      {
        id: "4",
        date: "25/10/2024",
        title: "Unila Terima Kunjungan SMA Negeri 1 Candipuro",
        content: "Universitas Lampung menerima kunjungan dari siswa dan guru SMA Negeri 1 Candipuro dalam rangka pengenalan kampus dan program studi yang tersedia di Unila.",
        image: "/images/featured-news.jpg",
        category: "Berita Utama"
      },
      {
        id: "5",
        date: "24/10/2024",
        title: "Erisca Febriani, Alumnus FP Terbitkan Novel Best Seller Trilogi Dear",
        content: "Alumnus Fakultas Pertanian Unila, Erisca Febriani, berhasil menerbitkan novel trilogi 'Dear' yang menjadi best seller nasional dan mendapat sambutan hangat dari pembaca.",
        image: "/images/featured-news.jpg",
        category: "Berita Utama"
      }
    ]
  };