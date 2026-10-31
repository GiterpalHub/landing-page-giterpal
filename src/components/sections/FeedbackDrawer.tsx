"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface FeedbackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FeedbackDrawer({ isOpen, onClose }: FeedbackDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const drawerContent = (
    <div
      className={`font-secondary fixed inset-0 z-[100] flex justify-end p-4 md:p-6 transition-all duration-500 ease-in-out ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        className={`absolute inset-0 -z-10 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      ></div>

      <div
        className={`relative h-full w-full max-w-[500px] rounded-[40px] bg-gradient-to-b from-[#6421B8] via-[#431688] to-[#21094E] shadow-[-20px_0_60px_rgba(100,33,184,0.4)] border border-white/10 flex flex-col p-8 md:p-10 transform transition-transform duration-500 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-[120%]"
        }`}
      >
        <div className="flex justify-end mb-6 relative z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 border border-white/5"
          >
            <X size={14} strokeWidth={2.5} />
          </button> 
        </div>

        <div className="mb-6 z-10">
          <h2 className="font-primary  text-4xl md:text-[42px] font-bold text-white tracking-wide leading-tight">
            Feedback Form
          </h2>
        </div>

        <div className="flex-1 flex flex-col relative z-10">
          <textarea
            className="w-full flex-1 md:flex-none md:min-h-[280px] lg:min-h-[320px] bg-white/20 hover:bg-white/25 focus:bg-white/25 border border-white/30 rounded-[24px] p-6 text-white text-sm md:text-base placeholder:text-gray-300 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/40 resize-none transition-all duration-300 shadow-[inset_0_4px_30px_rgba(255,255,255,0.06)] backdrop-blur-2xl"
            placeholder="kata anda . . . . . ."
          ></textarea>

          <div className="mt-8 flex justify-center pb-4 md:pb-0">
            <button
              onClick={onClose}
              className="w-full md:w-auto min-w-[200px] px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9F4BFF] to-[#7828E6] hover:from-[#AD66FF] hover:to-[#853BF0] text-white font-bold text-sm tracking-wide transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-[0_0_20px_rgba(159,75,255,0.5)]"
            >
              Kirim Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}