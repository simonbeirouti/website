import { startTransition, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { submitSupportTicket } from "@/app/(auth)/dashboard/actions"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { useRef } from "react"
import { supportTicketSchema } from "@/lib/validations"

interface FormState {
    error?: string;
    success?: boolean;
}

interface SupportFormProps {
    onClose?: () => void;
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button className="col-span-2" type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Submit Support Request"}
        </Button>
    )
}

export default function SupportForm({ onClose }: SupportFormProps) {
    const formRef = useRef<HTMLFormElement>(null)
    const [state, formAction] = useActionState<FormState, FormData>(
        async (prevState, formData) => {
            const result = await submitSupportTicket(prevState, formData)

            if (result.error) {
                toast.error(result.error)
                return result
            }

            toast.success("Support request submitted successfully")
            formRef.current?.reset()
            onClose?.()
            return { success: true }
        },
        {}
    )

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const rawData = {
            issueType: formData.get('issue-type'),
            severity: formData.get('severity'),
            description: formData.get('description')
        }

        const result = supportTicketSchema.safeParse(rawData)
        if (!result.success) {
            toast.error(result.error.errors[0].message)
            return
        }

        startTransition(() => {
            formAction(formData)
        })
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-1">
                <Label className="mb-2" htmlFor="issue-type">Issue Type</Label>
                <Select name="issue-type" required>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Issue</SelectItem>
                        <SelectItem value="account">Account Access</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="col-span-1">
                <Label className="mb-2" htmlFor="severity">Severity</Label>
                <Select name="severity" required>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select severity level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="col-span-2">
                <Label className="mb-2" htmlFor="description">Detailed Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Please provide details about your issue..."
                    className="min-h-[100px]"
                    required
                />
            </div>
            <SubmitButton />
            {state?.error && (
                <p className="col-span-2 text-sm text-red-500">{state.error}</p>
            )}
        </form>
    )
}