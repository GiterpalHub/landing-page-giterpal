'use client'

import { Share2 } from "lucide-react";

const ShareButton = () => {

    const handleShare = async () => {
        const url = window.location.href;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: document.title,
                    url,
                });
            } else {
                await navigator.clipboard.writeText(url);
                alert("Link artikel berhasil disalin!");
            }
        } catch (error) {
            if (
                error instanceof Error &&
                error.name !== "AbortError"
            ) {
                console.error("Gagal membagikan:", error);
            }
        }
    }
    return (
        <button
            type="button"
            aria-label="Bagikan artikel"
            onClick={() => handleShare()}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-secondary font-medium text-white backdrop-blur-xl transition-all duration-300 hover:bg-white hover:text-[#110C4C] hover:border-white shadow-sm"
        >
            <Share2 className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span>Bagikan</span>
        </button>
    );

}
export default ShareButton;