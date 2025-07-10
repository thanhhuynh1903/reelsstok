'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Send, Smile, AtSign } from 'lucide-react';
import VideoSection from './ui/video-section';
import VideoOverLayout from './ui/VideoOverLayout';
import EngagementButton from './ui/EngagementButton';
import CommentLayout from './ui/CommentLayout';
import '../components/ui/styles.css';
import type { GamingVideoPlayerProps, Comment } from '@/types/comment-types';
import type { TikTokVideo } from '@/types/video-types';
import { useQueryNoToken } from '@/lib/Query/QueryClient';
import { sampleComment } from '@/mock/sample';
export function LiveLayout({ isLive = false }: GamingVideoPlayerProps) {
  const [showComments, setShowComments] = useState<boolean>(true);
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>(sampleComment);
  const videoRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data } = useQueryNoToken({
    queryKey: ['gaming'],
    endpoint: `${process.env.NEXT_PUBLIC_API_URL_APIFY}`,
    enabled: true,
  });
  const videos = Array.isArray(data) ? (data.filter((video) => video.id) as TikTokVideo[]) : [];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<boolean[]>([]);
  const [isSaved, setIsSaved] = useState<boolean[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean[]>(videos.map(() => false));

  // Update isLiked, isSaved, and isPlaying when videos change
  useEffect(() => {
    setIsLiked(videos.map(() => false));
    setIsSaved(videos.map(() => false));
    setIsPlaying(videos.map((_, index) => index === currentVideoIndex));
  }, []);

  // GSAP animations for video and comments
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
      );
      gsap.fromTo(
        '.comment-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      );
      gsap.fromTo(
        '.engagement-btn',
        { scale: 0, rotation: 180 },
        { scale: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.7)' },
      );
    }, videoRef);

    return () => ctx.revert();
  }, []);

  // Scroll snapping
  useEffect(() => {
    if (scrollRef.current) {
      const handleScroll = () => {
        const scrollTop = scrollRef.current!.scrollTop;
        const videoHeight = window.innerHeight;
        const newIndex = Math.round(scrollTop / videoHeight);
        setCurrentVideoIndex(newIndex);
        // Update isPlaying to play only the current video
        setIsPlaying(videos.map((_, index) => index === newIndex));
      };

      scrollRef.current.addEventListener('scroll', handleScroll);
      return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [videos]);

  // Smooth scroll to current video
  useEffect(() => {
    if (scrollRef.current) {
      gsap.to(scrollRef.current, {
        scrollTo: { y: currentVideoIndex * window.innerHeight },
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [currentVideoIndex]);

  const handleLike = (index: number) => {
    setIsLiked((prev) => {
      const newLikes = [...prev];
      newLikes[index] = !newLikes[index];
      return newLikes;
    });
    gsap.fromTo(
      `.like-btn-${index}`,
      { scale: 1 },
      { scale: 1.5, duration: 0.4, yoyo: true, repeat: 1 },
    );
  };

  const handleSave = (index: number) => {
    setIsSaved((prev) => {
      const newSaves = [...prev];
      newSaves[index] = !newSaves[index];
      return newSaves;
    });
    gsap.fromTo(
      `.save-btn-${index}`,
      { scale: 1 },
      { scale: 1.4, duration: 0.4, yoyo: true, repeat: 1 },
    );
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        username: 'You',
        displayName: 'You',
        avatar: '/placeholder.svg?height=32&width=32',
        message: newComment,
        timestamp: 'now',
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Main Video Area */}
      <div className="flex-1 relative pl-8">
        <div
          ref={scrollRef}
          className="flex-1 h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
        >
          {videos.map((video, index) => (
            <div key={index} className="relative h-screen snap-center content-center">
              <div
                ref={videoRef}
                className="relative h-[700px] w-[750px] bg-gray-900 rounded-lg overflow-hidden mx-auto"
              >
                <VideoSection
                  video={video}
                  isMuted={isMuted}
                  isPlaying={isPlaying[index]}
                  setIsMuted={setIsMuted}
                  setIsPlaying={(playing: boolean) => {
                    setIsPlaying((prev) => {
                      const newPlaying = [...prev];
                      newPlaying[index] = playing;
                      return newPlaying;
                    });
                  }}
                />
                <VideoOverLayout
                  data={video}
                  isLive={isLive}
                  isPlaying={isPlaying[index]}
                  setIsPlaying={(playing: boolean) => {
                    setIsPlaying((prev) => {
                      const newPlaying = [...prev];
                      newPlaying[index] = playing;
                      return newPlaying;
                    });
                  }}
                />
                <EngagementButton
                  data={video}
                  handleLike={() => handleLike(index)}
                  isLiked={isLiked[index]}
                  handleSave={() => handleSave(index)}
                  isSaved={isSaved[index]}
                  isLive={isLive}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comments Panel */}
      {showComments && (
        <div className="w-96 bg-gray-950/95 backdrop-blur-xl border-l border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                {!isLive ? `Comments (${comments.length})` : `Live Chat (${comments.length})`}
              </h3>
              <button
                onClick={() => setShowComments(false)}
                className="p-1 hover:bg-gray-800 rounded transition-colors"
                aria-label="Close comments"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="overflow-y-scroll hide-scrollbar">
            <div ref={commentsRef} className="flex-1 overflow-y-auto p-4 space-y-4 overflow-hidden">
              {comments.map((comment) => (
                <CommentLayout
                  key={comment.id}
                  avatar={comment.avatar}
                  username={comment.displayName}
                  timestamp={comment.timestamp}
                  like={comment.likes}
                  message={comment.message}
                />
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-sm placeholder-gray-400 focus:outline-none"
                aria-label="Add a comment"
              />
              <button className="p-1 hover:bg-gray-700 rounded-full transition-colors" aria-label="Add mention">
                <AtSign className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-700 rounded-full transition-colors" aria-label="Add emoji">
                <Smile className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={handleSendComment}
                disabled={!newComment.trim()}
                className="p-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full transition-colors"
                aria-label="Send comment"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Press Enter to send</span>
              <span>{newComment.length}/500</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}