import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogpostCard";

async function getData(userId: string) {

  const data = await prisma.blogPost.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
      likes: true
    },
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

async function DeletePost(id: string) {
   const data = await prisma.blogPost.delete({
    where: {
      id: id,
    },
  });
  

}

export default async function DashboardRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData(user?.id);

  const value = true
  return (
    <div>
      <div className="flex items-center justify-between mb-4 mt-8">
        <h2 className="text-2xl font-bold">Your Blog Articles</h2>

     

        <Link 
          className={buttonVariants({ 
            variant: "ghost",
            className: "font-[800] bg-[#ff0000b0] text-white hover:bg-[#ff0000b0]/90"
          })} 
          href="/Dashboard/create"
        >
          Create
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogPostCard data={item} key={item.id}  />
        ))}
      </div>
    </div>
  );
}