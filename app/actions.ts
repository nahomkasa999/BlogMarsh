"use server"

import { redirect } from "next/navigation"
import { prisma } from "./utils/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function handleSubmission(formdata: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return redirect("/api/auth/login");
  }

  const { title, content, url } = Object.fromEntries(formdata.entries()) as {
    title: string;
    content: string;
    url: string;
  };

  await prisma.blogPost.create({
    data: {
      title,
      content,
      imageUrl: url,
      authorId: user.id,
      authorName: user.given_name || "Anonymous",
      authorImage: user.picture || "",
    },
  });

  return redirect("/Dashboard");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const { title, content, url } = Object.fromEntries(formData.entries()) as {
    title: string;
    content: string;
    url: string;
  };

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl: url,
      },
    });
    return { success: "Blog post updated successfully" };
  } catch (error) {
    return { error: "Failed to update blog post" };
  }
}

export async function deleteBlogPost(id: string) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.blogPost.delete({
      where: { id },
    });
    return { success: "Blog post deleted successfully" };
  } catch (error) {
    return { error: "Failed to delete blog post" };
  }
}
