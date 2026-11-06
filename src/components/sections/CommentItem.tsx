"use client";

import { CommentType } from "@/lib/commentUtils";
import CommentInput from "../CommentInput";
import CommentReplyItem from "./CommentReplyItem";

interface CommentItemProps {
  comment: CommentType;
  currentUserId: string;
  replyingTo: string | null;
  avatarClass: string;
  bubbleClass: string;
  pillClass: string;
  pillActiveClass: string;
  onToggleLike: (commentId: string, isLiked: boolean, parentId?: string) => void;
  onSetReplyingTo: (commentId: string | null) => void;
  onAddReply: (parentId: string, text: string) => void;
}

export default function CommentItem({
  comment,
  currentUserId,
  replyingTo,
  avatarClass,
  bubbleClass,
  pillClass,
  pillActiveClass,
  onToggleLike,
  onSetReplyingTo,
  onAddReply,
}: CommentItemProps) {
  return (
    <div>
      <div className="flex items-start gap-3.5 font-secondary">
        <div className={avatarClass}>{comment.initials}</div>
        <div className={bubbleClass}>
          <div className="flex items-baseline">
            <span className="text-sm md:text-base font-bold text-white">{comment.author}</span>
            
            {comment.userId === currentUserId && (
              <span className="ml-2 rounded-full bg-[#6F2ED6] px-2 py-0.5 text-[10px] font-bold tracking-wider text-white shadow-[0_0_10px_rgba(111,46,214,0.5)]">
                ANDA
              </span>
            )}
            
            <span className="ml-2 text-xs text-white/50">{comment.timeAgo}</span>
          </div>
          <p className="mt-1 text-sm md:text-base leading-relaxed text-white/80">{comment.content}</p>
          <div className="mt-3 flex gap-2 items-center">
            <button
              type="button"
              onClick={() => onToggleLike(comment.id, comment.isLiked)}
              className={comment.isLiked ? pillActiveClass : pillClass}
            >
              {comment.isLiked ? "Liked" : "Like"} {comment.likes > 0 && `(${comment.likes})`}
            </button>
            <button
              type="button"
              onClick={() => onSetReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className={pillClass}
            >
              {replyingTo === comment.id ? "Batal" : "Reply"}
            </button>
          </div>
        </div>
      </div>

      {(comment.replies.length > 0 || replyingTo === comment.id) && (
        <div className="ml-8 mt-3 border-l-2 border-white/10 pl-4 md:ml-12 space-y-4">
          {comment.replies.map((reply: CommentType) => (
            <CommentReplyItem
              key={reply.id}
              reply={reply}
              parentId={comment.id}
              currentUserId={currentUserId}
              avatarClass={avatarClass}
              bubbleClass={bubbleClass}
              pillClass={pillClass}
              pillActiveClass={pillActiveClass}
              onToggleLike={onToggleLike}
            />
          ))}

          {replyingTo === comment.id && (
            <div className="mt-3 animate-fade-in">
              <CommentInput
                onSubmit={(text) => onAddReply(comment.id, text)}
                placeholder={`Balas komentar ${comment.author}...`}
                autoFocus={true}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}