"use client";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { deleteBlogPost } from "@/app/actions";
import { useState } from "react";
import { toast } from "sonner"; // You'll need to install this package

interface CardEditProps {
    postId: string;
  }
  

export  function CardEdit({ postId }: CardEditProps) {
     const pathname = usePathname();
     const router = useRouter();
     const [isDeleting, setIsDeleting] = useState(false);
     const isDashboard = pathname.startsWith("/Dashboard");
  
     const handleDelete = async () => {
       if (window.confirm("Are you sure you want to delete this post?")) {
         setIsDeleting(true);
         try {
           const result = await deleteBlogPost(postId);
           if (result.error) {
             toast.error(result.error);
           } else {
             toast.success(result.success);
             router.refresh();
           }
         } catch (_err) {
           console.error("Failed to delete post:", _err);
           toast.error("Failed to delete post");
         } finally {
           setIsDeleting(false);
         }
       }
     };
  
     return (
       <>
         {isDashboard && (
           <div className="flex items-center justify-between h-auto mt-4 mr-4 overflow-hidden">
             <Link href={`/Dashboard/edit/${postId}`}>
               <button className="flex items-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg transition-transform duration-300 group-hover:scale-100">
                 <Pencil className="w-5 h-5" />
                 Edit
               </button>
             </Link>
     
             <button
               onClick={handleDelete}
               disabled={isDeleting}
               className="flex items-center gap-2 px-3 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
             >
               <Trash2 className="w-5 h-5" />
               {isDeleting ? "Deleting..." : "Delete"}
             </button>
           </div>
         )}
       </>
     )
}