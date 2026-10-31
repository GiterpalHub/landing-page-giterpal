'use client'

import { Share2 } from "lucide-react";
import { Button } from "./ui/button";

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
        <Button
            type="button"
            variant="glass"
            aria-label="Bagikan artikel"
            onClick={() => handleShare()}
            className="lg:hidden rounded-full"
        >
            <Share2 />
            <span>Bagikan</span>
        </Button>
    );

}
export default ShareButton;