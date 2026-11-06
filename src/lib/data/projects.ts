import { StaticImageData } from "next/image";
import {
  projectPlaceholder1,
  projectPlaceholder2,
  projectPlaceholder3,
  projectPlaceholder4,
  projectPlaceholder5,
} from "@/assets/projects placeholder";

export {
  projectPlaceholder1,
  projectPlaceholder2,
  projectPlaceholder3,
  projectPlaceholder4,
  projectPlaceholder5,
};

export interface Project {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  image: StaticImageData;
  category: "Web" | "Mobile"; 
  creator?: string;  
  liveUrl?: string;  
  repoUrl?: string; 
  creatorUrl?: string; 
}

export const projects: Project[] = [
  {
    title: "DIGITAL MARKETING BEHANCE",
    slug: "digital-marketing-behance",
    excerpt:
      "Website portofolio untuk menampilkan studi kasus kampanye digital marketing, lengkap dengan layanan, alur kerja, dan hasil kampanye.",
    description:
      "Website portofolio bergaya Behance yang dirancang untuk agensi atau freelancer digital marketing. Pengunjung dapat melihat layanan yang ditawarkan, alur kerja dari registrasi hingga kampanye berjalan, serta studi kasus beserta hasilnya. Antarmuka dibuat responsif dengan tata letak bersih dan fokus pada visual, sehingga calon klien bisa menilai kualitas kerja dengan cepat.",
    image: projectPlaceholder1,
    category: "Web",
    creator: "Seseorang",
    creatorUrl: "https://www.instagram.com/giterpal.community", 
    liveUrl: "https://giterpal.vercel.app/",
    repoUrl: "https://github.com/GiterpalHub/landing-page-giterpal",
  },
  {
    title: "TEAM CREATOR",
    slug: "team-creator",
    excerpt:
      "Aplikasi kolaborasi tim untuk membuat tim, membagi tugas, dan memantau progres proyek dalam satu tempat.",
    description:
      "Aplikasi web yang membantu mahasiswa dan tim kecil berkolaborasi dalam proyek. Pengguna dapat membuat tim, mengundang anggota, membagi tugas beserta tenggat, dan memantau status pengerjaan secara bersama. Dengan satu dashboard terpusat, komunikasi dan pembagian peran jadi lebih jelas dan tidak tersebar di banyak aplikasi.",
    image: projectPlaceholder2,
    category: "Web",
    creator: "Giterpal",
    liveUrl: "https://team-creator.vercel.app",
    repoUrl: "https://github.com/GiterpalHub/landing-page-giterpal",
  },
  {
    title: "POINT OF SALES APP",
    slug: "point-of-sales-app",
    excerpt:
      "Aplikasi kasir web untuk mencatat transaksi, mengelola stok barang, dan menghasilkan laporan penjualan dan pembelian.",
    description:
      "Sistem kasir berbasis web untuk usaha kecil. Fitur utamanya meliputi pencatatan transaksi penjualan dan pembelian, manajemen data barang beserta stok masuk dan keluar, serta laporan penjualan, pembelian, stok barang, dan barang terjual. Data barang dapat difilter berdasarkan tanggal, sehingga pemilik usaha bisa memantau perputaran stok dan omzet tanpa pencatatan manual.",
    image: projectPlaceholder3,
    category: "Web",
    creator: "Seseorang",
    creatorUrl: "https://www.instagram.com/giterpal.community", 
    liveUrl: "https://giterpal.vercel.app/",
    repoUrl: "https://github.com/GiterpalHub/landing-page-giterpal", 
   },
  {
    title: "E-WALLET MOBILE APP",
    slug: "e-wallet-mobile-app",
    excerpt:
      "Aplikasi dompet digital untuk menyimpan saldo, melakukan pembayaran, dan transfer dengan tampilan yang sederhana.",
    description:
      "Aplikasi mobile dompet digital dengan antarmuka modern dan mudah dipahami. Pengguna dapat melihat saldo, mengisi ulang, melakukan pembayaran, dan mentransfer dana, serta memantau riwayat transaksi. Desain menekankan kemudahan penggunaan dengan alur singkat di setiap langkah transaksi, agar pengguna baru pun bisa langsung memakainya.",
    image: projectPlaceholder4,
    category: "Mobile",
    creator: "Giterpal Mobile Dev",
    creatorUrl: "https://www.instagram.com/giterpal.community", 
    liveUrl: "https://play.google.com/store/apps/details?id=com.mobile.legends&pcampaignid=web_share",
    repoUrl: "https://github.com/GiterpalHub/landing-page-giterpal", 
  },
];
