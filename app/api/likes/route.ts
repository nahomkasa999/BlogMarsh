import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();
    
    const post = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        likes: {
          increment: 1
        }
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update likes" },
      { status: 500 }
    );
  }
} 