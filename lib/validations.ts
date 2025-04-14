import { z } from "zod"

export const supportTicketSchema = z.object({
  issueType: z.enum(["technical", "billing", "account", "feature", "other"]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  description: z.string().min(10, "Description must be at least 10 characters long")
})

export const feedbackSchema = z.object({
  rating: z.number().min(1).max(10),
  feedback: z.string().min(10, "Feedback must be at least 10 characters long")
}) 