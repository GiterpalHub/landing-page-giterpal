"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommentInput from "../CommentInput";
import CommentItem from "./CommentItem";
import { CommentType, getInitials } from "@/lib/commentUtils";

const avatarClass = "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6F2ED6] text-sm font-bold tracking-wide text-white shadow-md";
const bubbleClass = "flex-1 rounded-2xl rounded-tl-none border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-sm";
const pillClass = "rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-white transition hover:bg-white/20";
const pillActiveClass = "rounded-full bg-[#6F2ED6] px-4 py-1 text-xs font-medium text-white transition shadow-[0_0_10px_rgba(111,46,214,0.5)]";

interface CommentSectionClientProps {
  articleId: string;
  initialComments: CommentType[];
  serverUserId: string;
}

export default function CommentSectionClient({ articleId, initialComments, serverUserId }: CommentSectionClientProps) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>(serverUserId);
  const router = useRouter();

  useEffect(() => {
    let storedId = localStorage.getItem("giterpal_guest_id");
    if (!storedId) {
      storedId = `guest_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("giterpal_guest_id", storedId);
      document.cookie = `giterpal_guest_id=${storedId}; path=/; max-age=31536000; SameSite=Lax`;
    }
    setCurrentUserId(storedId);
  }, []);

  useEffect(() => {
    setComments((prevComments) => {
      const mergeData = (incoming: CommentType[], existing: CommentType[]): CommentType[] => {
        return incoming.map((newItem) => {
          const oldItem = existing.find((o) => o.id === newItem.id);
          return {
            ...newItem,
            isLiked: oldItem ? oldItem.isLiked : newItem.isLiked,
            likes: oldItem ? oldItem.likes : newItem.likes,
            replies: mergeData(newItem.replies, oldItem ? oldItem.replies : [])
          };
        });
      };
      return mergeData(initialComments, prevComments);
    });
  }, [initialComments]);

  // Realtime synchronization via Server-Sent Events (SSE)
  useEffect(() => {
    const eventSource = new EventSource(`/api/comments/events?articleId=${encodeURIComponent(articleId)}`);

    eventSource.addEventListener("comment", () => {
      router.refresh();
    });

    eventSource.addEventListener("like", () => {
      router.refresh();
    });

    eventSource.onerror = (err) => {
      console.warn("SSE connection error (will reconnect automatically):", err);
    };

    return () => {
      eventSource.close();
    };
  }, [articleId, router]);

  const handleAddComment = async (text: string) => {
    const tempId = Date.now().toString();
    const guestName = `Guest-${currentUserId.substring(6, 12)}`; 

    const newComment: CommentType = {
      id: tempId,
      author: guestName,
      initials: getInitials(guestName),
      content: text,
      timeAgo: "Baru saja",
      likes: 0,
      isLiked: false,
      replies: [],
      userId: currentUserId,
    };
    setComments([...comments, newComment]);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          author: guestName,
          content: text,
          parentId: null,
          userId: currentUserId,
        }),
      });

      const json = await res.json();
      if (json.data) {
        setComments((prev) => prev.map(c => c.id === tempId ? { ...c, id: json.data.id } : c));
      }
    } catch (error) {
      console.error("Gagal mengirim komentar:", error);
    }
  };

  const handleAddReply = async (parentId: string, text: string) => {
    const tempId = Date.now().toString();
    const guestName = `Guest-${currentUserId.substring(6, 12)}`;

    const newReply: CommentType = {
      id: tempId,
      author: guestName,
      initials: getInitials(guestName),
      content: text,
      timeAgo: "Baru saja",
      likes: 0,
      isLiked: false,
      replies: [],
      userId: currentUserId,
    };

    setComments(comments.map((comment) => {
      if (comment.id === parentId) return { ...comment, replies: [...comment.replies, newReply] };
      return comment;
    }));
    setReplyingTo(null);

    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          author: guestName,
          content: text,
          parentId,
          userId: currentUserId,
        }),
      });
    } catch (error) {
      console.error("Gagal mengirim balasan:", error);
    }
  };

  const handleToggleLike = async (commentId: string, isCurrentlyLiked: boolean, parentId?: string) => {
    setComments(comments.map((comment) => {
      if (!parentId && comment.id === commentId) {
        return { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 };
      }
      if (parentId && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map((reply: CommentType) => {
            if (reply.id === commentId) return { ...reply, isLiked: !reply.isLiked, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1 };
            return reply;
          }),
        };
      }
      return comment;
    }));

    try {
      await fetch("/api/comments/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId,
          articleId,
          userId: currentUserId,
          isCurrentlyLiked,
        }),
      });
    } catch (error) {
      console.error("Gagal toggle like:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <h3 className="text-primary text-xl font-bold text-white mb-4">Komentar ({comments.length})</h3>

      <CommentInput onSubmit={handleAddComment} />

      <div className="mt-8 space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
            replyingTo={replyingTo}
            avatarClass={avatarClass}
            bubbleClass={bubbleClass}
            pillClass={pillClass}
            pillActiveClass={pillActiveClass}
            onToggleLike={handleToggleLike}
            onSetReplyingTo={setReplyingTo}
            onAddReply={handleAddReply}
          />
        ))}
      </div>
    </div>
  );
}
