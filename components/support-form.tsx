import * as React from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SupportForm() {
    return (
        <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-1">
                <Label className="mb-2" htmlFor="issue-type">Issue Type</Label>
                <Select>
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
                <Select>
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
                    placeholder="Please provide details about your issue..."
                    className="min-h-[100px]"
                />
            </div>
            <Button className="col-span-2" type="submit">Submit Support Request</Button>
        </div>
    )
}