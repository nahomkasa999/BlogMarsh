import { notFound } from "next/navigation";
import { prisma } from "../../utils/db";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
async function getData(id: string) {
  const data = await prisma.blogPost.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type params = Promise<{ id: string }>; //Id similar to the one in the path post/[id]

export default async function IdPage({ params }: { params: params }) {
  const { id } = await params;
  const data = await getData(id);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link className={buttonVariants({ variant: "secondary" })} href="/">
        ← Back to Home
      </Link>

      <div className="mt-6 space-y-6">
        <h1 className="text-4xl font-bold">{data.title}</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
          <Image
            src={data.authorImage}
            alt={data.authorName}
            className="rounded-full w-10 h-10"
            fill
            priority
          />
          </div>
          
          <p className="text-lg font-medium">{data.authorName}</p>
        </div>

        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt={data.title}
            className="w-full rounded-lg shadow-md"
          />
        )}

        <p className="text-gray-700 text-lg leading-relaxed">{data.content}</p>
      </div>
    </div>
  );
}