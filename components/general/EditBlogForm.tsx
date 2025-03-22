'use client';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/general/Submitbutton";
import { updateBlogPost } from "@/app/actions";
import { TipTapEditor } from "./TipTapEditor";
import { useState } from "react";

interface EditBlogFormProps {
    post: {
        title: string;
        content: string;
        imageUrl: string;
    };
    postId: string;
}

export function EditBlogForm({ post, postId }: EditBlogFormProps) {
    const router = useRouter();
    const [content, setContent] = useState(post.content);

    return (
        <form 
            className="flex flex-col gap-4" 
            action={async (formData: FormData) => {
                const result = await updateBlogPost(postId, formData);
                if (result.error) {
                    toast.error(result.error);
                } else {
                    toast.success(result.success);
                    router.push('/Dashboard');
                }
            }}
        >
            <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input 
                    type="text" 
                    className="border border-gray-300 p-1" 
                    name="title"
                    defaultValue={post.title}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Content</Label>
                <TipTapEditor 
                    content={content} 
                    onChange={setContent} 
                />
                <input type="hidden" name="content" value={content} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Image URL</Label>
                <Input 
                    type="text"
                    className="border border-gray-300 p-1" 
                    name="url"
                    defaultValue={post.imageUrl}
                />
            </div>
            <SubmitButton />
        </form>
    );
} 