"use client";

import{ useState } from "react";
import FeedbackDrawer from "./sections/FeedbackDrawer";

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
            <button onClick={()=>setIsOpen(true)} className="w-full sm:w-auto px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.4)] flex items-center justify-center gap-2 group text-xs sm:text-sm font-medium">
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
                />
              </svg>
              Beri Feedback
            </button>

      <FeedbackDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}