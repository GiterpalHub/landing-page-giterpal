"use client";

import { CommentType, initialCommentsData } from "@/lib/data/comment";
import { useState } from "react";
import CommentInput from "../CommentInput";

const avatarClass = "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#6F2ED6] text-lg font-bold text-white shadow-md";
const bubbleClass = "flex-1 rounded-2xl rounded-tl-none border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-sm";
const pillClass = "rounded-full bg-white/10 px-4 py-1 text-xs font-medium text-white transition hover:bg-white/20";
const pillActiveClass = "rounded-full bg-[#6F2ED6] px-4 py-1 text-xs font-medium text-white transition shadow-[0_0_10px_rgba(111,46,214,0.5)]";

export default function CommentSection() {
  const [comments, setComments] = useState<CommentType[]>(initialCommentsData);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleAddComment = (text: string) => {
    const newComment: CommentType = {
      id: Date.now().toString(),
      author: "Anda", 
      initials: "A",
      content: text,
      timeAgo: "Baru saja",
      likes: 0,
      isLiked: false,
      replies: [],
    };
    setComments([newComment, ...comments]);
  };

  const handleAddReply = (parentId: string, text: string) => {
    const newReply: CommentType = {
      id: Date.now().toString(),
      author: "Anda",
      initials: "A",
      content: text,
      timeAgo: "Baru saja",
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments(
      comments.map((comment) => {
        if (comment.id === parentId) {
          return { ...comment, replies: [...comment.replies, newReply] };
        }
        return comment;
      })
    );
    setReplyingTo(null);
  };

  const handleToggleLike = (commentId: string, parentId?: string) => {
    setComments(
      comments.map((comment) => {
        if (!parentId && comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        
        if (parentId && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                };
              }
              return reply;
            }),
          };
        }
        return comment;
      })
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <h3 className="text-primary text-xl font-bold text-white mb-4">Komentar ({comments.length})</h3>
      
      <CommentInput onSubmit={handleAddComment} />

      <div className="mt-8 space-y-6">
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="flex items-start gap-3.5 font-secondary">
              <div className={avatarClass}>{comment.initials}</div>
              <div className={bubbleClass}>
                <div className="flex items-baseline">
                  <span className="text-sm md:text-base font-bold text-white">{comment.author}</span>
                  <span className="ml-2 text-xs text-white/50">{comment.timeAgo}</span>
                </div>
                <p className="mt-1 text-sm md:text-base leading-relaxed text-white/80">
                  {comment.content}
                </p>
                <div className="mt-3 flex gap-2 items-center">
                  <button 
                    type="button" 
                    onClick={() => handleToggleLike(comment.id)}
                    className={comment.isLiked ? pillActiveClass : pillClass}
                  >
                    {comment.isLiked ? "Liked" : "Like"} {comment.likes > 0 && `(${comment.likes})`}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className={pillClass}
                  >
                    {replyingTo === comment.id ? "Batal" : "Reply"}
                  </button>
                </div>
              </div>
            </div>

            {(comment.replies.length > 0 || replyingTo === comment.id) && (
              <div className="ml-8 mt-3 border-l-2 border-white/10 pl-4 md:ml-12 space-y-4">
                
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-3.5 font-secondary mt-3">
                    <div className={`${avatarClass} h-8 w-8 text-sm`}>{reply.initials}</div>
                    <div className={`${bubbleClass} px-4 py-3`}>
                      <div className="flex items-baseline">
                        <span className="text-sm font-bold text-white">{reply.author}</span>
                        <span className="ml-2 text-xs text-white/50">{reply.timeAgo}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-white/80">
                        {reply.content}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button 
                          type="button" 
                          onClick={() => handleToggleLike(reply.id, comment.id)}
                          className={reply.isLiked ? pillActiveClass : pillClass}
                        >
                          {reply.isLiked ? "Liked" : "Like"} {reply.likes > 0 && `(${reply.likes})`}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {replyingTo === comment.id && (
                  <div className="mt-3 animate-fade-in">
                    <CommentInput 
                      onSubmit={(text) => handleAddReply(comment.id, text)} 
                      placeholder={`Balas komentar ${comment.author}...`}
                      autoFocus={true}
                    />
                  </div>
                )}
                
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}