"use client";

import { CommentType } from "@/lib/commentUtils";


interface CommentReplyItemProps {
  reply: CommentType;
  parentId: string;
  currentUserId: string;
  avatarClass: string;
  bubbleClass: string;
  pillClass: string;
  pillActiveClass: string;
  onToggleLike: (commentId: string, isLiked: boolean, parentId?: string) => void;
}

export default function CommentReplyItem({
  reply,
  parentId,
  currentUserId,
  avatarClass,
  bubbleClass,
  pillClass,
  pillActiveClass,
  onToggleLike,
}: CommentReplyItemProps) {
  return (
    <div className="flex items-start gap-3.5 font-secondary mt-3">
      <div className={`${avatarClass} h-8 w-8 text-xs`}>{reply.initials}</div>
      <div className={`${bubbleClass} px-4 py-3`}>
        <div className="flex items-baseline">
          <span className="text-sm font-bold text-white">{reply.author}</span>
          
          {reply.userId === currentUserId && (
            <span className="ml-2 rounded-full bg-[#6F2ED6] px-2 py-0.5 text-[10px] font-bold tracking-wider text-white shadow-[0_0_10px_rgba(111,46,214,0.5)]">
              ANDA
            </span>
          )}
          
          <span className="ml-2 text-xs text-white/50">{reply.timeAgo}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-white/80">{reply.content}</p>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => onToggleLike(reply.id, reply.isLiked, parentId)}
            className={reply.isLiked ? pillActiveClass : pillClass}
          >
            {reply.isLiked ? "Liked" : "Like"} {reply.likes > 0 && `(${reply.likes})`}
          </button>
        </div>
      </div>
    </div>
  );
}