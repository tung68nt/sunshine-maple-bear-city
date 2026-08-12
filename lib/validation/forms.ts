import { z } from 'zod'

const cleanText = (max: number) => z.string().trim().min(1).max(max)
const optionalText = (max: number) => z.string().trim().max(max).optional().default('')

export const admissionSchema = z.object({
  parentName: cleanText(120),
  parentEmail: z.string().trim().email().max(254),
  parentPhone: cleanText(30).regex(/^[+0-9().\s-]{8,30}$/),
  childName: cleanText(120),
  childDob: z.string().trim().max(32).optional().default(''),
  gradeLevel: optionalText(100),
  notes: optionalText(1500),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(''),
  turnstileToken: z.string().min(1).optional(),
})

export const tourBookingSchema = z.object({
  visitorName: cleanText(120),
  visitorEmail: z.string().trim().email().max(254),
  visitorPhone: cleanText(30).regex(/^[+0-9().\s-]{8,30}$/),
  preferredDate: z.string().trim().max(32).optional().default(''),
  preferredTime: z.string().trim().max(32).optional().default(''),
  childAge: optionalText(50),
  numberOfVisitors: z.coerce.number().int().min(1).max(10).optional().default(1),
  notes: optionalText(1500),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(''),
  turnstileToken: z.string().min(1).optional(),
})

export const eventRegistrationSchema = z.object({
  eventTitle: cleanText(200),
  name: cleanText(120),
  email: z.string().trim().email().max(254),
  phone: cleanText(30).regex(/^[+0-9().\s-]{8,30}$/),
  participants: z.coerce.number().int().min(1).max(10).default(1),
  note: optionalText(1500),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(''),
  turnstileToken: z.string().min(1).optional(),
})
