import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function FeedbackForm() {
    return (
        <div className="grid gap-4 py-4">
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
                    placeholder="Share your feedback"
                    className="min-h-[100px]"
                />
            </div>
            <Button type="submit">Submit Feedback</Button>
        </div>
    )
}