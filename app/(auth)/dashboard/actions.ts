'use server'

import { createSupportTicket, createFeedbackEntry } from '@/lib/db/queries'
import { getUser } from '@/lib/db/queries'
import { revalidatePath } from 'next/cache'
import { supportTicketSchema, feedbackSchema } from '@/lib/validations'

interface FormState {
  error?: string;
}

export async function submitSupportTicket(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const user = await getUser()
    if (!user) {
      return { error: 'User not authenticated' }
    }

    const rawData = {
      issueType: formData.get('issue-type'),
      severity: formData.get('severity'),
      description: formData.get('description')
    }

    const result = supportTicketSchema.safeParse(rawData)
    if (!result.success) {
      return { error: result.error.errors[0].message }
    }

    await createSupportTicket(user.id, result.data)

    revalidatePath('/dashboard')
    return {}
  } catch (error) {
    return { error: 'Failed to submit support ticket' }
  }
}

export async function submitFeedback(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const user = await getUser()
    if (!user) {
      return { error: 'User not authenticated' }
    }

    const rawData = {
      rating: parseInt(formData.get('rating') as string),
      feedback: formData.get('feedback')
    }

    const result = feedbackSchema.safeParse(rawData)
    if (!result.success) {
      return { error: result.error.errors[0].message }
    }

    await createFeedbackEntry(user.id, result.data)

    revalidatePath('/dashboard')
    return {}
  } catch (error) {
    return { error: 'Failed to submit feedback' }
  }
}
