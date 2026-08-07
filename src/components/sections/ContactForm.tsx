'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'
import { CONTACT_EMAIL } from '@/lib/constants'
import {
  contactSchema,
  PROJECT_TYPES,
  type ContactFormValues,
  type ProjectType,
} from '@/lib/schemas/contact'

interface ContactFormProps {
  locale: string
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

// Shared input class — dark navy bg, soft glass borders, yellow focus ring.
const inputBase =
  'block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-body text-white placeholder:text-white/30 transition-colors duration-200 focus:border-yellow focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-yellow/30 disabled:opacity-60 disabled:cursor-not-allowed'

const inputError = 'border-red-400/60 focus:border-red-400 focus:ring-red-400/30'

const labelBase = 'block text-small font-medium text-white/80 mb-2'

export function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('Contact.form')
  const [state, setState] = useState<FormState>('idle')
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: undefined,
      message: '',
      gdpr: undefined,
      hp: '',
      locale,
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setState('submitting')
    setSubmitError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      })
      if (!res.ok) {
        throw new Error(`status_${res.status}`)
      }
      const payload = (await res.json()) as { ok?: boolean; error?: string }
      if (!payload.ok) {
        throw new Error(payload.error || 'unknown')
      }
      setState('success')
      reset()
    } catch (err) {
      console.error('contact_submit_failed', err)
      setSubmitError(t('error', { email: CONTACT_EMAIL }))
      setState('error')
    }
  }

  /** Map a zod error key (e.g. "name_min") to a translated message. */
  const errMsg = (key: string | undefined): string | undefined => {
    if (!key) return undefined
    // The error key was set as the zod `message` in the schema.
    return t(`errors.${key}`)
  }

  if (state === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-yellow/30 bg-gradient-to-br from-yellow/10 via-white/5 to-transparent p-8 md:p-10"
      >
        <div
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow text-navy"
        >
          <Check className="h-6 w-6" strokeWidth={2.5} />
        </div>
        <h3 className="mt-5 text-h3 font-semibold text-white [text-wrap:balance]">
          {t('success')}
        </h3>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="mt-6 inline-flex items-center gap-2 text-small font-semibold text-yellow hover:text-yellow-600 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded-md"
        >
          <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
          <span>{locale === 'cs' ? 'Odeslat další zprávu' : 'Send another message'}</span>
        </button>
      </div>
    )
  }

  const isBusy = state === 'submitting' || isSubmitting

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isBusy}
      className="flex flex-col gap-6"
    >
      {/* Honeypot — visually hidden, off-tab, not for screen readers as a field */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-hp">Do not fill this field</label>
        <input
          id="contact-hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('hp')}
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelBase}>
          {t('name')}
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          disabled={isBusy}
          className={cn(inputBase, errors.name && inputError)}
          {...register('name')}
        />
        {errors.name && (
          <p
            id="contact-name-error"
            className="mt-1.5 text-caption text-red-300"
          >
            {errMsg(errors.name.message)}
          </p>
        )}
      </div>

      {/* Email + Phone side-by-side on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="contact-email" className={labelBase}>
            {t('email')}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            disabled={isBusy}
            className={cn(inputBase, errors.email && inputError)}
            {...register('email')}
          />
          {errors.email && (
            <p
              id="contact-email-error"
              className="mt-1.5 text-caption text-red-300"
            >
              {errMsg(errors.email.message)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelBase}>
            {t('phone')}{' '}
            <span className="font-normal text-white/40">
              ({t('phoneOptional')})
            </span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            disabled={isBusy}
            className={cn(inputBase, errors.phone && inputError)}
            {...register('phone')}
          />
          {errors.phone && (
            <p
              id="contact-phone-error"
              className="mt-1.5 text-caption text-red-300"
            >
              {errMsg(errors.phone.message)}
            </p>
          )}
        </div>
      </div>

      {/* Project type */}
      <div>
        <label htmlFor="contact-project-type" className={labelBase}>
          {t('projectType')}
        </label>
        <select
          id="contact-project-type"
          aria-invalid={errors.projectType ? 'true' : 'false'}
          aria-describedby={
            errors.projectType ? 'contact-project-type-error' : undefined
          }
          disabled={isBusy}
          defaultValue=""
          className={cn(
            inputBase,
            'appearance-none bg-[right_1rem_center] bg-no-repeat pr-12',
            errors.projectType && inputError
          )}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23FCC013'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '1.25rem 1.25rem',
            colorScheme: 'dark',
          }}
          {...register('projectType')}
        >
          <option value="" disabled className="bg-navy text-white/60">
            {t('projectTypePlaceholder')}
          </option>
          {PROJECT_TYPES.map((slug: ProjectType) => (
            <option key={slug} value={slug} className="bg-navy text-white">
              {t(`projectTypes.${slug}`)}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p
            id="contact-project-type-error"
            className="mt-1.5 text-caption text-red-300"
          >
            {errMsg(errors.projectType.message)}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelBase}>
          {t('message')}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          disabled={isBusy}
          className={cn(inputBase, 'resize-y min-h-32', errors.message && inputError)}
          {...register('message')}
        />
        {errors.message && (
          <p
            id="contact-message-error"
            className="mt-1.5 text-caption text-red-300"
          >
            {errMsg(errors.message.message)}
          </p>
        )}
      </div>

      {/* GDPR checkbox */}
      <div>
        <label
          htmlFor="contact-gdpr"
          className="flex items-start gap-3 cursor-pointer group"
        >
          <input
            id="contact-gdpr"
            type="checkbox"
            disabled={isBusy}
            aria-invalid={errors.gdpr ? 'true' : 'false'}
            aria-describedby={errors.gdpr ? 'contact-gdpr-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/20 bg-white/5 accent-yellow focus:ring-2 focus:ring-yellow/30 focus:ring-offset-0 cursor-pointer"
            {...register('gdpr')}
          />
          <span className="text-caption text-white/65 leading-relaxed group-hover:text-white/80 transition-colors duration-200">
            {t('gdpr')}
          </span>
        </label>
        {errors.gdpr && (
          <p
            id="contact-gdpr-error"
            className="mt-1.5 text-caption text-red-300"
          >
            {errMsg(errors.gdpr.message)}
          </p>
        )}
      </div>

      {/* Error banner */}
      {state === 'error' && submitError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-small text-red-100"
        >
          <AlertCircle
            className="h-5 w-5 shrink-0 text-red-300"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <p className="leading-relaxed">{submitError}</p>
        </div>
      )}

      {/* Submit */}
      <div className="mt-2">
        <button
          type="submit"
          disabled={isBusy}
          aria-busy={isBusy}
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-yellow px-8 py-4 text-base font-syne font-semibold text-navy shadow-sm transition-all duration-200 ease-out hover:bg-yellow-600 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isBusy ? (
            <>
              <Loader2
                className="h-5 w-5 animate-spin"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span>{t('submitting')}</span>
            </>
          ) : (
            <>
              <span>{t('submit')}</span>
              <ArrowRight
                className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </>
          )}
        </button>
      </div>
    </form>
  )
}
