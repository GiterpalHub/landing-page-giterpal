"use client";

import { useRef, FormEvent, useState } from "react";

interface CommentInputProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export default function CommentInput({ onSubmit, placeholder = "Tulis komentar kamu...", autoFocus = false }: CommentInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setText(textarea.value);
  };

  const handleSubmit = () => {
    if (text.trim() === "") return;
    onSubmit(text);
    setText(""); 
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
    }
  };

  return (
    <div className="w-full font-secondary mt-2">
      <textarea
        ref={textareaRef}
        value={text}
        onInput={handleInput}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        rows={1}
        autoFocus={autoFocus}
        className="max-h-[300px] min-h-[70px] w-full resize-none overflow-y-auto rounded-3xl border border-white/20 bg-black/20 px-5 py-4 text-base md:text-lg text-white outline-none backdrop-blur-md placeholder:text-white/40 focus:border-[#6F2ED6]/50 focus:bg-black/40 transition-all"
      />

      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="rounded-full bg-[#6F2ED6] px-7 py-2 text-sm md:text-base font-semibold shadow-[0_0_15px_rgba(168,85,247,0.5)] transition hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}