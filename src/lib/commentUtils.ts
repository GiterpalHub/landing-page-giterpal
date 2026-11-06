
export interface CommentDB {
    id: string;
    article_id: string;
    parent_id: string | null;
    author: string;
    content: string;
    created_at: string;
    user_id: string;
    comment_likes?: Array<{ count: number }> | { count: number };
}

export interface CommentType {
    id: string;
    author: string;
    initials: string;
    content: string;
    timeAgo: string;
    likes: number;
    isLiked: boolean;
    replies: CommentType[];
    userId: string;
}

export function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    return `${Math.floor(diffInSeconds / 86400)} hari lalu`;
}

export function getInitials(name: string): string {
    if (!name) return 'U';

    if (name.toLowerCase().startsWith('guest-')) {
        const randomPart = name.split('-')[1];
        if (randomPart && randomPart.length > 0) {
            return `G${randomPart[0].toUpperCase()}`;
        }
        return 'G';
    }

    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}

export function buildCommentTree(flatComments: CommentDB[], myLikedIds: string[] = []): CommentType[] {
    const commentMap = new Map<string, CommentType>();
    const rootComments: CommentType[] = [];
    const likedSet = new Set(myLikedIds);

    flatComments.forEach((c) => {
        const likeCount = Array.isArray(c.comment_likes)
            ? c.comment_likes[0]?.count || 0
            : c.comment_likes?.count || 0;

        commentMap.set(c.id, {
            id: c.id,
            author: c.author,
            initials: getInitials(c.author),
            content: c.content,
            timeAgo: getTimeAgo(c.created_at),
            likes: likeCount,
            isLiked: likedSet.has(c.id),
            replies: [],
            userId: c.user_id,
        });
    });

    flatComments.forEach((c) => {
        const currentComment = commentMap.get(c.id)!;
        if (c.parent_id) {
            const parent = commentMap.get(c.parent_id);
            if (parent) {
                parent.replies.push(currentComment);
            }
        } else {
            rootComments.push(currentComment);
        }
    });

    return rootComments;
}