export interface CommentType {
  id: string;
  author: string;
  initials: string;
  content: string;
  timeAgo: string;
  likes: number;
  isLiked: boolean;
  replies: CommentType[];
}

export const initialCommentsData: CommentType[] = [
  {
    id: "1",
    author: "Rizky P.",
    initials: "R",
    content: "Artikelnya membantu banget buat mulai belajar prompting yang lebih terarah.",
    timeAgo: "2 jam lalu",
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        author: "Anggi W.",
        initials: "A",
        content: "Setuju! Terutama di bagian framework-nya sangat jelas.",
        timeAgo: "1 jam lalu",
        likes: 2,
        isLiked: false,
        replies: [],
      },
    ],
  },
];