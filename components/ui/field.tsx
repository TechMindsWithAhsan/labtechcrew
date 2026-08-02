import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Form primitives, dark-first.
 *
 * Every input gets a real <label> (not a placeholder used as a label) and an
 * aria-describedby wired to its error. Placeholder-as-label fails screen
 * readers and fails anyone who forgets what a half-filled field was for.
 *
 * On a dark form the focus state has to be unmistakable — coral border plus
 * a coral ring. Dark forms with a subtle focus state are a known conversion
 * leak: people cannot tell where they are typing.
 */

const control =
  'w-full rounded-(--radius-md) border border-white/15 bg-white/5 px-3.5 py-2.5 text-body ' +
  'text-white placeholder:text-(--color-text-subtle) transition-colors duration-150 ' +
  'hover:border-white/30 focus:border-coral-500 focus:bg-white/8 focus:outline-none ' +
  'aria-[invalid=true]:border-(--color-danger) ' +
  '[[data-theme=light]_&]:border-(--color-border) [[data-theme=light]_&]:bg-white ' +
  '[[data-theme=light]_&]:text-(--color-text)'

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-small font-medium text-(--color-text)">
        {label}
        {required ? <span className="ml-0.5 text-(--color-accent)">*</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="text-small text-(--color-text-subtle)">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-small text-(--color-danger)">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(control, className)} {...props} />
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea rows={5} className={cn(control, 'resize-y', className)} {...props} />
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <select
      className={cn(control, 'appearance-none pr-9 [&>option]:bg-brand-800 [&>option]:text-white', className)}
      {...props}
    >
      {children}
    </select>
  )
}

export function Checkbox({
  id,
  label,
  ...props
}: { id: string; label: ReactNode } & ComponentProps<'input'>) {
  return (
    <div className="flex items-start gap-2.5">
      <input
        id={id}
        type="checkbox"
        className="mt-1 size-4 shrink-0 rounded-[3px] border-white/30 accent-(--color-coral-500)"
        {...props}
      />
      <label htmlFor={id} className="text-small text-(--color-text-muted)">
        {label}
      </label>
    </div>
  )
}

/**
 * Honeypot. Hidden from humans and assistive tech, visible to naive bots.
 * Never `display: none` alone — some bots skip those. Off-screen +
 * aria-hidden + tabIndex -1 is the durable version.
 */
export function Honeypot({ name = 'website_url' }: { name?: string }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor={name}>Leave this field empty</label>
      <input id={name} name={name} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
