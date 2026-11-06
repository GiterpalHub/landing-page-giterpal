"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CommentInput from "../CommentInput";
import CommentItem from "./CommentItem";
import { createClient } from "@/lib/supabase";
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
    }
    
    document.cookie = `giterpal_guest_id=${storedId}; path=/; max-age=31536000; SameSite=Lax`;
    
    if (storedId !== currentUserId) {
      setCurrentUserId(storedId);
    }
  }, [currentUserId]);

  useEffect(() => {
    setComments(prevComments => {
      if (prevComments.length === 0) return initialComments;
      const mergeData = (newItems: CommentType[], oldItems: CommentType[]): CommentType[] => {
        return newItems.map(newItem => {
          const oldItem = oldItems.find(o => o.id === newItem.id);
          return {
            ...newItem,
            isLiked: oldItem ? oldItem.isLiked : newItem.isLiked,
            replies: mergeData(newItem.replies, oldItem ? oldItem.replies : [])
          };
        });
      };
      return mergeData(initialComments, prevComments);
    });
  }, [initialComments]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel(`realtime-comments-${articleId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments', filter: `article_id=eq.${articleId}` }, () => {
        router.refresh();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comment_likes' }, () => {
        router.refresh();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
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

    const { data, error } = await createClient().from('comments').insert([{
      article_id: articleId,
      author: guestName,
      content: text,
      parent_id: null,
      user_id: currentUserId,
    }]).select().single();

    if (error) console.error("Gagal mengirim komentar", error);
    if (data) {
      setComments((prev) => prev.map(c => c.id === tempId ? { ...c, id: data.id } : c));
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

    await createClient().from('comments').insert([{
      article_id: articleId,
      author: guestName,
      content: text,
      parent_id: parentId,
      user_id: currentUserId,
    }]);
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

    const supabase = createClient();
    if (isCurrentlyLiked) {
      await supabase.from('comment_likes').delete().eq('comment_id', commentId).eq('user_id', currentUserId);
    } else {
      await supabase.from('comment_likes').insert([{ comment_id: commentId, user_id: currentUserId }]);
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