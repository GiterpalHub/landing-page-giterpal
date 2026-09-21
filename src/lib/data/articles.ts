import type { StaticImageData } from "next/image";
import aiImage from "@/assets/projects/sample-1.png";
import webImage from "@/assets/projects/sample-2.png";
import frontendImage from "@/assets/projects/sample-3.png";

export interface Article {
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  coverImage: StaticImageData;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "memanfaatkan-ai-sebagai-partner-belajar",
    title: "Memanfaatkan AI sebagai Partner Belajar Developer",
    category: "Artificial Intelligence",
    author: "Tim Giterpal",
    date: "15 Januari 2026",
    excerpt:
      "AI dapat membantu mahasiswa memahami konsep teknis lebih cepat, selama digunakan untuk berdiskusi dan bereksperimen, bukan sekadar menyalin jawaban.",
    coverImage: aiImage,
    content: [
      "Perkembangan kecerdasan buatan membuat cara kita belajar pemrograman ikut berubah. Sebagai mahasiswa, kita dapat menggunakan AI untuk memecah konsep yang rumit, mencari sudut pandang alternatif, dan mendapatkan umpan balik lebih cepat ketika mengerjakan proyek.",
      "Namun, AI sebaiknya diposisikan sebagai partner belajar, bukan pengganti proses berpikir. Sebelum meminta solusi, jelaskan masalah dengan bahasa sendiri dan tuliskan pendekatan yang sudah dicoba. Kebiasaan ini membantu kita memahami alasan di balik setiap perubahan kode.",
      "Salah satu alur belajar yang efektif adalah meminta AI memberikan contoh sederhana, menguji contoh tersebut secara mandiri, lalu memodifikasinya untuk kebutuhan proyek. Setelah itu, dokumentasikan apa yang berhasil dan apa yang belum. Dengan cara ini, hasil belajar tetap berasal dari proses eksplorasi.",
      "Di Giterpal, teknologi akan selalu dipelajari bersama dengan diskusi, code review, dan proyek nyata. AI dapat mempercepat proses tersebut, tetapi rasa ingin tahu, ketelitian, dan kolaborasi tetap menjadi fondasi utama seorang developer.",
    ],
  },
  {
    slug: "membangun-proyek-web-dari-masalah-nyata",
    title: "Membangun Proyek Web dari Masalah Nyata",
    category: "Web Development",
    author: "Tim Giterpal",
    date: "12 Januari 2026",
    excerpt:
      "Proyek yang baik dimulai dari masalah yang ingin diselesaikan. Pelajari cara mengubah observasi sederhana menjadi produk digital yang terukur.",
    coverImage: webImage,
    content: [
      "Banyak proyek mahasiswa dimulai dari teknologi yang sedang populer, lalu mencari masalah yang cocok setelahnya. Pendekatan ini tidak selalu salah, tetapi sering membuat produk kehilangan arah. Memulai dari masalah nyata membantu tim memahami siapa pengguna dan mengapa solusi tersebut penting.",
      "Mulailah dengan observasi sederhana. Catat proses yang berulang, informasi yang sulit ditemukan, atau aktivitas yang masih dilakukan secara manual. Setelah itu, lakukan wawancara singkat dengan calon pengguna untuk memastikan bahwa masalah tersebut benar-benar dirasakan.",
      "Tahap berikutnya adalah membuat versi minimum yang dapat diuji. Jangan langsung membangun semua fitur. Pilih satu alur utama, tentukan indikator keberhasilan, dan minta pengguna mencoba prototype tersebut. Masukan awal biasanya lebih berharga daripada asumsi yang dibuat terlalu lama di dalam tim.",
      "Dengan proses ini, proyek web tidak hanya menjadi latihan framework. Proyek tersebut menjadi sarana untuk belajar riset, komunikasi, desain, pengembangan, dan evaluasi dalam satu pengalaman yang utuh.",
    ],
  },
  {
    slug: "memilih-framework-frontend-untuk-proyek-mahasiswa",
    title: "Memilih Framework Frontend untuk Proyek Mahasiswa",
    category: "Frontend Development",
    author: "Tim Giterpal",
    date: "10 Januari 2026",
    excerpt:
      "Tidak ada framework yang paling benar untuk semua proyek. Pertimbangkan kebutuhan produk, kemampuan tim, ekosistem, dan waktu pengerjaan sebelum memilih.",
    coverImage: frontendImage,
    content: [
      "Perdebatan mengenai framework frontend sering berfokus pada performa atau popularitas. Untuk proyek mahasiswa, pertimbangan yang lebih penting adalah apakah tim dapat memahami alat tersebut dan menyelesaikan kebutuhan produk dengan konsisten.",
      "Next.js cocok untuk tim yang membutuhkan routing, rendering server, optimasi gambar, dan struktur aplikasi yang terintegrasi. React dengan tooling yang lebih sederhana dapat menjadi pilihan baik untuk prototype atau aplikasi satu halaman. Framework lain juga memiliki keunggulan masing-masing.",
      "Sebelum memilih, tuliskan kebutuhan proyek secara konkret: apakah ada halaman publik yang membutuhkan SEO, apakah data sering berubah, bagaimana proses deployment-nya, dan seberapa besar pengalaman tim dengan framework tersebut. Jawaban ini akan membantu mempersempit pilihan.",
      "Framework hanyalah alat. Arsitektur komponen yang jelas, pengelolaan state yang terukur, pengujian, dan dokumentasi tetap lebih menentukan kualitas aplikasi daripada nama teknologi yang digunakan.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
