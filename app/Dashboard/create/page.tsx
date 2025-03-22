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
import { useState } from "react"
import { ImageUpload } from "@/components/general/ImageUpload"

export default function CreateBlogroute(){
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    return (
        <div className="flex justify-center items-center mt-6">
            <Card className="w-1/2 ">     
                <CardHeader>
                    <CardTitle>Create Blog</CardTitle>
                    <CardDescription>Write your blog here</CardDescription>
                </CardHeader> 
                <CardContent>
                    <form className="flex flex-col gap-4" action={handleSubmission}>
                        <div className="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input type="text" className="border border-gray-300 p-1" name="title" />
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
                            <Label>Image</Label>
                            <ImageUpload 
                                onImageUrl={(url) => setImageUrl(url)} 
                            />
                            <input type="hidden" name="url" value={imageUrl} />
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}