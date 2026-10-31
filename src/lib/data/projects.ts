import { StaticImageData } from "next/image"; 
import DigitalMarketing from "@/assets/projects/sample-1.png";
import TeamCreator from "@/assets/projects/sample-2.png";
import PointOfSales from "@/assets/projects/sample-3.png";
import WalletApp from "@/assets/projects/sample-4.png";

export interface Project {
  title: string;
  slug: string;
  excerpt: string;
  description:string;
  image: StaticImageData ;
  category: "Web" | "Mobile"; 
}

export const projects: Project[] = [
  {
    title: "DIGITAL MARKETING BEHANCE",
    slug: "digital-marketing-behance",
    excerpt:
      "Website portofolio untuk menampilkan studi kasus kampanye digital marketing, lengkap dengan layanan, alur kerja, dan hasil kampanye.",
    description:
      "Website portofolio bergaya Behance yang dirancang untuk agensi atau freelancer digital marketing. Pengunjung dapat melihat layanan yang ditawarkan, alur kerja dari registrasi hingga kampanye berjalan, serta studi kasus beserta hasilnya. Antarmuka dibuat responsif dengan tata letak bersih dan fokus pada visual, sehingga calon klien bisa menilai kualitas kerja dengan cepat. Dikerjakan oleh.",
    image: DigitalMarketing,
    category: "Web",
  },
  {
    title: "TEAM CREATOR",
    slug: "team-creator",
    excerpt:
      "Aplikasi kolaborasi tim untuk membuat tim, membagi tugas, dan memantau progres proyek dalam satu tempat.",
    description:
      "Aplikasi web yang membantu mahasiswa dan tim kecil berkolaborasi dalam proyek. Pengguna dapat membuat tim, mengundang anggota, membagi tugas beserta tenggat, dan memantau status pengerjaan secara bersama. Dengan satu dashboard terpusat, komunikasi dan pembagian peran jadi lebih jelas dan tidak tersebar di banyak aplikasi. Dikerjakan oleh.",
    image: TeamCreator,
    category: "Web",
  },
  {
    title: "POINT OF SALES APP",
    slug: "point-of-sales-app",
    excerpt:
      "Aplikasi kasir web untuk mencatat transaksi, mengelola stok barang, dan menghasilkan laporan penjualan dan pembelian.",
    description:
      "Sistem kasir berbasis web untuk usaha kecil. Fitur utamanya meliputi pencatatan transaksi penjualan dan pembelian, manajemen data barang beserta stok masuk dan keluar, serta laporan penjualan, pembelian, stok barang, dan barang terjual. Data barang dapat difilter berdasarkan tanggal, sehingga pemilik usaha bisa memantau perputaran stok dan omzet tanpa pencatatan manual. Dikerjakan oleh.",
    image: PointOfSales,
    category: "Web",
  },
  {
    title: "E-WALLET MOBILE APP",
    slug: "e-wallet-mobile-app",
    excerpt:
      "Aplikasi dompet digital untuk menyimpan saldo, melakukan pembayaran, dan transfer dengan tampilan yang sederhana.",
    description:
      "Aplikasi mobile dompet digital dengan antarmuka modern dan mudah dipahami. Pengguna dapat melihat saldo, mengisi ulang, melakukan pembayaran, dan mentransfer dana, serta memantau riwayat transaksi. Desain menekankan kemudahan penggunaan dengan alur singkat di setiap langkah transaksi, agar pengguna baru pun bisa langsung memakainya. Dikerjakan oleh.",
    image: WalletApp,
    category: "Mobile",
  },
];