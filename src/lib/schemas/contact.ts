import { z } from 'zod'

export const PROJECT_TYPES = [
  'residential',
  'solar-parks',
  'carports',
  'facades',
  'floating-pv',
  'repairs',
  'other',
] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]

/**
 * Contact form schema. Shared between client validation (react-hook-form)
 * and server-side validation in the API route.
 *
 * The `hp` field is a honeypot (must be empty). The `gdpr` checkbox must
 * be checked. Strings have generous max lengths to keep abuse contained.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'name_min' })
    .max(120, { message: 'name_max' }),
  email: z
    .string()
    .trim()
    .email({ message: 'email_invalid' })
    .max(254, { message: 'email_max' }),
  phone: z
    .string()
    .trim()
    .max(40, { message: 'phone_max' })
    .optional()
    .or(z.literal('')),
  projectType: z.enum(PROJECT_TYPES, { message: 'projectType_required' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'message_min' })
    .max(4000, { message: 'message_max' }),
  gdpr: z.literal(true, { message: 'gdpr_required' }),
  locale: z.string().max(5).optional(),
  hp: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof contactSchema>
