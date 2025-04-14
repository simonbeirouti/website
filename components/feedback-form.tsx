import { startTransition, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitFeedback } from "@/app/(auth)/dashboard/actions"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { useRef } from "react"
import { feedbackSchema } from "@/lib/validations"

interface FormState {
    error?: string;
    success?: boolean;
}

interface FeedbackFormProps {
    onClose?: () => void;
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit Feedback"}
        </Button>
    )
}

export default function FeedbackForm({ onClose }: FeedbackFormProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const [state, formAction] = useActionState<FormState, FormData>(
        async (prevState, formData) => {
            const result = await submitFeedback(prevState, formData)

            if (result.error) {
                toast.error(result.error)
                return result
            }

            toast.success("Feedback submitted successfully")
            formRef.current?.reset()
            onClose?.()
            return { success: true }
        },
        {}
    )

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const rawData = {
            rating: parseInt(formData.get('rating') as string),
            feedback: formData.get('feedback')
        }

        const result = feedbackSchema.safeParse(rawData)
        if (!result.success) {
            toast.error(result.error.errors[0].message)
            return
        }

        startTransition(() => {
            formAction(formData)
        })
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="grid gap-4 py-4"
        >
            <Label className="-mb-2">Rating</Label>
            <div className="grid gap-2">
                <div className="flex w-full">
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <div key={num} className="relative flex-1">
                            <input
                                type="radio"
                                name="rating"
                                id={`rating-${num}`}
                                value={num}
                                className="peer absolute inset-0 opacity-0 cursor-pointer"
                                required
                            />
                            <Label
                                htmlFor={`rating-${num}`}
                                className="flex items-center justify-center h-8 w-full text-xs peer-checked:text-white peer-checked:bg-black border border-gray-200 relative"
                            >
                                <span className="peer-checked:opacity-0">{num}</span>
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Share your feedback"
                    className="min-h-[100px]"
                    required
                />
            </div>
            <SubmitButton />
            {state?.error && (
                <p className="text-sm text-red-500">{state.error}</p>
            )}
        </form>
    )
}