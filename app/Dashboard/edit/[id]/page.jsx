import {
    Card,
    CardDescription,
    CardTitle,
    CardHeader,
    CardContent
} from "@/components/ui/card"

import { EditBlogForm } from "@/components/general/EditBlogForm"
import { prisma } from "@/app/utils/db"
import { notFound } from "next/navigation"

async function getBlogPost(id) {
    const post = await prisma.blogPost.findUnique({
        where: { id }
    });
    
    if (!post) return notFound();
    return post;
}

export default async function EditBlogRoute({ params }) {
    const { id } = await params;
    const post = await getBlogPost(id);

    return (
        <div className="flex justify-center items-center mt-6">
            <Card className="w-1/2">     
                <CardHeader>
                    <CardTitle>Edit Blog Post</CardTitle>
                    <CardDescription>Make changes to your blog post</CardDescription>
                </CardHeader> 
                <CardContent>
                    <EditBlogForm post={post} postId={id} />
                </CardContent>
            </Card>
        </div>
    );
}