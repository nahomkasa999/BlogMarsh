"use client";

import Image from "next/image";
import Link from "next/link";
import {CardEdit} from "../general/Editing"
import { useState } from 'react';
import { Heart } from 'lucide-react';

interface IAppProps {
  data: {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    authorImage: string;
    createdAt: Date;
    updatedAt: Date;
    likes: number;
  };
}

function stripHtml(html: string) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export function BlogPostCard({ data }: IAppProps) {
  const [likes, setLikes] = useState(data.likes);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: data.id })
      });

      if (response.ok) {
        setLikes(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a2e] shadow-md transition-all hover:shadow-lg flex flex-col h-full">
      <div className="absolute top-2 right-2 z-10">
        <button 
          onClick={handleLike}
          disabled={isLoading}
          className="flex items-center gap-1 bg-white dark:bg-[#1a1a2e] rounded-full px-3 py-1 shadow-md transition-all duration-300 hover:scale-105 disabled:opacity-50"
        >
          <Heart 
            size={16} 
            className={`transition-colors duration-300 ${
              likes > 0 ? 'fill-[#ff0000b0] text-[#ff0000b0] dark:fill-white dark:text-white' : 'text-gray-500 dark:text-white'
            }`}
          />
          <span className={`text-sm font-medium transition-colors duration-300 ${
            likes > 0 ? 'text-[#ff0000b0] dark:text-white' : 'text-gray-500 dark:text-white'
          }`}>
            {likes}
          </span>
        </button>
      </div>
      <Link href={`/blog/${data.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={data.title}
            className="object-cover w-full h-48 rounded-t-lg transition-transform duration-300 group-hover:scale-110"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            unoptimized
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1 flex flex-col min-h-[200px]">
          <Link href={`/blog/${data.id}`} className="block">
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white hover:text-[#ff0000b0] transition-colors">
              {data.title}
            </h2>
          </Link>
          
          <div className="flex-1 flex items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
              {stripHtml(data.content)}
            </p>
          </div>

          <CardEdit postId={data.id} />
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div>
              <Image
                src={data.authorImage}
                alt={data.authorName}
                className="rounded-full object-cover transition-transform duration-300 group-hover:border-[#ff0000b0]"
                width={30}
                height={30}
              />
            </div>
            <p className="text-black dark:text-white hover:text-[#ff0000b0] transition-colors">
              {data.authorName}
            </p>
          </div>
          <p className="text-black dark:text-white hover:text-[#ff0000b0] transition-colors">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(new Date(data.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
}
