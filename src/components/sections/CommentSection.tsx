import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase";
import CommentSectionClient from "./CommentSectionClient";
import { buildCommentTree, CommentDB } from "@/lib/commentUtils";

interface CommentSectionProps {
  articleId: string;
}

export default async function CommentSection({ articleId }: CommentSectionProps) {
  const supabase = createClient();
  
  const cookieStore = cookies();
  const currentUserId = cookieStore.get("giterpal_guest_id")?.value || "";

  const { data: flatComments, error } = await supabase
    .from("comments")
    .select(`
      *,
      comment_likes (count)
    `)
    .eq("article_id", articleId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
  }

  let myLikedCommentIds: string[] = [];
  if (currentUserId && flatComments && flatComments.length > 0) {
    const commentIds = flatComments.map(c => c.id);
    const { data: likesData } = await supabase
      .from("comment_likes")
      .select("comment_id")
      .eq("user_id", currentUserId)
      .in("comment_id", commentIds);

    if (likesData) {
      myLikedCommentIds = likesData.map(l => l.comment_id);
    }
  }

  const initialComments = buildCommentTree((flatComments as CommentDB[]) || [], myLikedCommentIds);

  return (
    <CommentSectionClient 
      articleId={articleId} 
      initialComments={initialComments} 
      serverUserId={currentUserId}
    />
  );
}