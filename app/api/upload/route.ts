import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const file = await request.blob();
    const filename = `blog-images/${Date.now()}.${file.type.split('/')[1]}`;

    const { url } = await put(filename, file, {
      access: 'public',
      addRandomSuffix: true
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 