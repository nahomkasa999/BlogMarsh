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

async function getBlogPost(id: string) {
    const post = await prisma.blogPost.findUnique({
        where: { id }
    });
    
    if (!post) return notFound();
    return post;
}

export default async function EditBlogRoute({ params }: { params: { id: string } }) {
    const post = await getBlogPost(params?.id);

    return (
        <div className="flex justify-center items-center mt-6">
            <Card className="w-1/2">     
                <CardHeader>
                    <CardTitle>Edit Blog Post</CardTitle>
                    <CardDescription>Make changes to your blog post</CardDescription>
                </CardHeader> 
                <CardContent>
                    <EditBlogForm post={post} postId={params.id} />
                </CardContent>
            </Card>
        </div>
    );
}