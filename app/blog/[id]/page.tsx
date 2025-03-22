import { prisma } from "@/app/utils/db";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 200;

interface BlogPost {
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
}

async function getData(id: string): Promise<BlogPost> {
  try {
    const data = await prisma.blogPost.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      notFound();
    }

    return data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw new Error("Failed to fetch blog post");
  }
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { id } = await params;
  const data = await getData(id);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link className={buttonVariants({ variant: "secondary" })} href="/">
        Back to posts
      </Link>

      <div className="mb-8 mt-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">{data.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src={data.authorImage}
                alt={data.authorName}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium">{data.authorName}</p>
          </div>
          <p className="text-sm text-gray-500">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(data.createdAt))}
          </p>
        </div>
      </div>

      <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
        <Image
          src={data.imageUrl}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <Card className="border-none shadow-none dark:bg-[#1a1a2e]">
        <CardContent className="prose prose-lg max-w-none dark:prose-invert">
          <div 
            dangerouslySetInnerHTML={{ __html: data.content }} 
            className="dark:text-gray-300"
          />
        </CardContent>
      </Card>
    </div>
  );
}