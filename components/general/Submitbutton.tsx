"use client";
import {useFormStatus} from "react-dom"
import {Button} from "../ui/button"
import {Loader2} from "lucide-react"

interface SubmitButtonProps {
    isPending?: boolean;
}

export function SubmitButton({ isPending }: SubmitButtonProps) {
    const {pending} = useFormStatus();
    const isLoading = pending || isPending;

    return <Button disabled={isLoading} type="submit" className="w-full">
        {isLoading ? (
            <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
            </>
        ) : (
            "Submit"
        )}
    </Button>
}