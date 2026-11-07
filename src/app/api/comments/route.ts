import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { sseManager } from "@/lib/sse";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const articleId = searchParams.get("articleId");

    if (!articleId) {
      return NextResponse.json({ error: "Missing articleId" }, { status: 400 });
    }

    const result = await pool.query(
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

    const comments = result.rows.map((row) => ({
      ...row,
      comment_likes: [{ count: row.like_count }],
    }));

    return NextResponse.json({ data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { articleId, author, content, parentId, userId } = body;

    if (!articleId || !author || !content || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await pool.query(
      `
      INSERT INTO comments (article_id, parent_id, author, content, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, article_id, parent_id, author, content, user_id, created_at
      `,
      [articleId, parentId || null, author, content, userId]
    );

    const newComment = result.rows[0];

    // Broadcast realtime event via SSE to all connected clients viewing this article
    sseManager.broadcast(articleId, "comment", {
      type: parentId ? "new_reply" : "new_comment",
      comment: newComment,
    });

    return NextResponse.json({ data: newComment });
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}

