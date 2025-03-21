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
