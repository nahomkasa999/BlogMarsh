"use client"
import {
    Card,
    CardDescription,
    CardTitle,
    CardHeader,
    CardContent
} from "@/components/ui/card"

import {Textarea} from "@/components/ui/textarea"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {handleSubmission} from "../../actions"
import { SubmitButton } from "@/components/general/Submitbutton"
import { TipTapEditor } from "@/components/general/TipTapEditor"
import { useState, useTransition } from "react"
import { ImageUpload } from "@/components/general/ImageUpload"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CreateBlogroute(){
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [title, setTitle] = useState('')
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleSubmit = async (formData: FormData) => {
        // Client-side validation
        if (title.length < 3) {
            toast.error("Title must be at least 3 characters long")
            return
        }

        if (content.length < 50) {
            toast.error("Content must be at least 50 characters long")
            return
        }

        if (!imageUrl) {
            toast.error("Image URL is required")
            return
        }

        startTransition(async () => {
            const result = await handleSubmission(formData)
            
            if (result.error) {
                toast.error(result.error)
                return
            }

            if (result.success) {
                toast.success(result.success)
                router.push('/Dashboard')
            }
        })
    }

    return (
        <div className="flex justify-center items-center mt-6">
            <Card className="w-full max-w-2xl mx-4">     
                <CardHeader>
                    <CardTitle>Create Blog</CardTitle>
                    <CardDescription>Write your blog here</CardDescription>
                </CardHeader> 
                <CardContent>
                    <form className="flex flex-col gap-4" action={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input 
                                id="title"
                                type="text" 
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your blog title"
                                className="border border-gray-300 p-1" 
                            />
                            <p className="text-xs text-gray-500">
                                {title.length}/100 characters
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="content">Content</Label>
                            <TipTapEditor 
                                content={content} 
                                onChange={setContent} 
                            />
                            <input type="hidden" name="content" value={content} />
                            <p className="text-xs text-gray-500">
                                Minimum 50 characters required
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input 
                                id="imageUrl"
                                type="text" 
                                name="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="Enter image URL or use upload below"
                                className="border border-gray-300 p-1" 
                            />
                            <div className="mt-2">
                                <Label className="text-sm text-muted-foreground">Upload an image</Label>
                                <ImageUpload 
                                    onImageUrl={(url) => setImageUrl(url)}
                                    defaultImage={imageUrl} 
                                />
                            </div>
                        </div>
                        <SubmitButton isPending={isPending} />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}