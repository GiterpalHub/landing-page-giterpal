import { cookies } from "next/headers";
import { pool } from "@/lib/db";
import CommentSectionClient from "./CommentSectionClient";
import { buildCommentTree, CommentDB } from "@/lib/commentUtils";

interface CommentSectionProps {
  articleId: string;
}

export default async function CommentSection({ articleId }: CommentSectionProps) {
  const cookieStore = cookies();
  const currentUserId = cookieStore.get("giterpal_guest_id")?.value || "";

  let flatComments: CommentDB[] = [];
  try {
    const commentsRes = await pool.query(
      `
      SELECT 
        c.id, 
        c.article_id, 
        c.parent_id, 
        c.author, 
        c.content, 
        c.user_id, 
        c.created_at,
        COALESCE(COUNT(l.id), 0)::int as like_count
      FROM comments c
      LEFT JOIN comment_likes l ON l.comment_id = c.id
      WHERE c.article_id = $1
      GROUP BY c.id
      ORDER BY c.created_at ASC
      `,
      [articleId]
    );

    flatComments = commentsRes.rows.map((row) => ({
      ...row,
      comment_likes: [{ count: row.like_count }],
    }));
  } catch (error) {
    console.error("Error fetching comments:", error);
  }

  let myLikedCommentIds: string[] = [];
  if (currentUserId && flatComments.length > 0) {
    const commentIds = flatComments.map((c) => c.id);
    try {
      const likesRes = await pool.query(
        "SELECT comment_id FROM comment_likes WHERE user_id = $1 AND comment_id = ANY($2::uuid[])",
        [currentUserId, commentIds]
      );
      myLikedCommentIds = likesRes.rows.map((l) => l.comment_id);
    } catch (error) {
      console.error("Error fetching user likes:", error);
    }
  }

  const initialComments = buildCommentTree(flatComments, myLikedCommentIds);

  return (
    <CommentSectionClient 
      articleId={articleId} 
      initialComments={initialComments} 
      serverUserId={currentUserId}
    />
  );
}
