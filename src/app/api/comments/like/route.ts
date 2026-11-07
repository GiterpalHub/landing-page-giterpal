import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { sseManager } from "@/lib/sse";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentId, articleId, userId, isCurrentlyLiked } = body;

    if (!commentId || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (isCurrentlyLiked) {
      await pool.query(
        "DELETE FROM comment_likes WHERE comment_id = $1 AND user_id = $2",
        [commentId, userId]
      );
    } else {
      await pool.query(
        `
        INSERT INTO comment_likes (comment_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (comment_id, user_id) DO NOTHING
        `,
        [commentId, userId]
      );
    }

    if (articleId) {
      // Broadcast like update via SSE
      sseManager.broadcast(articleId, "like", {
        commentId,
        userId,
        isLiked: !isCurrentlyLiked,
      });
    }

    return NextResponse.json({ success: true, isLiked: !isCurrentlyLiked });
  } catch (error) {
    console.error("Error toggling like:", error);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}

