'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Loader2 , X } from 'lucide-react';

interface ImageUploadProps {
  onImageUrl: (url: string) => void;
  defaultImage?: string;
}

export function ImageUpload({ onImageUrl, defaultImage }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      
      // Create FormData
      const filename = `${Date.now()}-${file.name}`;
      
      // Upload to Vercel Blob
      const response = await fetch(`/api/upload?filename=${filename}`, {
        method: 'POST',
        body: file,
      });

      const data = await response.json();
      
      if (data.url) {
        setPreview(data.url);
        onImageUrl(data.url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUrl('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
        />
        {preview && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={removeImage}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {preview && (
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            unoptimized
            onError={() => {
              setError(true);
              setPreview(null);
              onImageUrl('');
            }}
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">
          Failed to load image. Please try uploading again.
        </p>
      )}

      {loading && (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
        </div>
      )}
    </div>
  );
} 