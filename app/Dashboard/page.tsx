import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPostCard } from "@/components/general/BlogpostCard";

async function getData(userId: string) {

  const data = await prisma.blogPost.findMany({
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

        <Link className={buttonVariants()} href="/Dashboard/create">
          Create Post
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