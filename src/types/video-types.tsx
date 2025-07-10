export interface TikTokVideo {
  id: string;
  text: string;
  textLanguage?: string;
  createTime: number;
  createTimeISO: string;
  isAd: boolean;
  authorMeta: {
    id: string;
    name: string;
    profileUrl: string;
    nickName: string;
    verified: boolean;
    signature: string;
    bioLink: string | null;
    originalAvatarUrl: string;
    avatar: string;
    privateAccount: boolean;
    following: number;
    friends: number;
    fans: number;
    heart: number;
    video: number;
    digg: number;
  };
  webVideoUrl: string;
  mediaUrls: string[];
  videoMeta: {
    height: number;
    width: number;
    duration: number;
    coverUrl: string;
    originalCoverUrl: string;
    definition: string;
    format: string;
    downloadAddr: string;
  };
  diggCount: number;
  shareCount: number;
  playCount: number;
  collectCount: number;
  commentCount: number;
  mentions: string[];
  detailedMentions: string[];
  hashtags: {
    name: string;
  }[];
  effectStickers?: {
    ID: string;
    name: string;
    stickerStats: {
      useCount: number;
    };
  }[];
  isSlideshow?: boolean;
  isPinned?: boolean;
  isSponsored?: boolean;
}