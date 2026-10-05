'use client'

import { createContext, useContext, useId, type FormEventHandler, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Turnstile } from '@/components/turnstile'
import { cx } from './cx'
import { Heading, displayClass } from './Heading'
import { Icon } from './Icon'
import { Reveal } from './Reveal'
import { Text } from './Text'

/**
 * Form kit: the controls every page form is built from. It reuses the `.ds-form` rules
 * that style `ContactForm` and adds select, checkbox / radio, rating, file and message.
 *
 *   <Form onSubmit={…}>
 *     <Field label="Name" required><Input name="name" required /></Field>
 *     <Field label="Message" full><Textarea name="message" /></Field>
 *     <Checkbox required checked={…} onChange={…}>I agree…</Checkbox>
 *     <FormActions note="…"><Button type="submit">Send</Button></FormActions>
 *   </Form>
 */

type FieldState = { id: string; describedBy?: string; invalid?: boolean }
const FieldContext = createContext<FieldState | null>(null)

type FormProps = {
  onSubmit?: FormEventHandler<HTMLFormElement>
  /** switch the browser's own required / type checks off when the page validates itself */
  noValidate?: boolean
  id?: string
  'aria-label'?: string
  children: ReactNode
}

/** Grid wrapper: one column on phones, two from 768px (a `full` field spans both). */
export function Form({ onSubmit, noValidate, id, children, ...aria }: FormProps) {
  return (
    <form id={id} className="ds-form ds-form--kit" onSubmit={onSubmit} noValidate={noValidate} {...aria}>
      {children}
    </form>
  )
}

type FieldProps = {
  label: string
  required?: boolean
  /** helper line under the label */
  hint?: string
  error?: string
  /** span both columns */
  full?: boolean
  children: ReactNode
}

/** Label + one control + hint / error. The control inside picks up the id, so the label is always associated. */
export function Field({ label, required, hint, error, full, children }: FieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className={cx('ds-form__field', full && 'ds-form__field--full')}>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {hint && (
        <span id={hintId} className="ds-form__hint">
          {hint}
        </span>
      )}
      <FieldContext.Provider value={{ id, describedBy, invalid: !!error }}>{children}</FieldContext.Provider>
      {error && (
        <span id={errorId} className="ds-form__error" role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

function useControl(id?: string) {
  const field = useContext(FieldContext)
  return {
    id: id ?? field?.id,
    'aria-describedby': field?.describedBy,
    'aria-invalid': field?.invalid || undefined,
  }
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'>

/** Text-like input (`text`, `tel`, `email`, `date`, `number`, `file` …). */
export function Input({ id, type = 'text', ...rest }: InputProps) {
  return <input type={type} {...rest} {...useControl(id)} />
}

type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'style'>

export function Textarea({ id, rows = 3, ...rest }: TextareaProps) {
  return <textarea rows={rows} {...rest} {...useControl(id)} />
}

type Option = string | { value: string; label: string }
const optionValue = (o: Option) => (typeof o === 'string' ? o : o.value)
const optionLabel = (o: Option) => (typeof o === 'string' ? o : o.label)

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'style' | 'children'> & {
  options: Option[]
  /** first, empty option (e.g. "-- Please choose --") */
  placeholder?: string
}

export function Select({ id, options, placeholder, ...rest }: SelectProps) {
  return (
    <select {...rest} {...useControl(id)}>
      {placeholder != null && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={optionValue(o)} value={optionValue(o)}>
          {optionLabel(o)}
        </option>
      ))}
    </select>
  )
}

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'type' | 'children'> & {
  /** the label text */
  children: ReactNode
  /** inside a `Field` / group: do not take a grid row of its own */
  inline?: boolean
}

/** A single checkbox with its label (consent lines); spans both columns unless `inline`. */
export function Checkbox({ children, inline, ...rest }: CheckboxProps) {
  const box = (
    <label className="ds-form__check">
      <input type="checkbox" {...rest} />
      <span>{children}</span>
    </label>
  )
  return inline ? box : <div className="ds-form__field ds-form__field--full">{box}</div>
}

type GroupProps = {
  label: string
  name: string
  options: Option[]
  required?: boolean
  hint?: string
  error?: string
  full?: boolean
  /** lay the options out in a row */
  inline?: boolean
}

function Group({ label, required, hint, error, full, inline, role, children }: Omit<GroupProps, 'name' | 'options'> & { role?: 'radiogroup'; children: ReactNode }) {
  const id = useId()
  return (
    <fieldset className={cx('ds-form__field ds-form__group', full && 'ds-form__field--full')} role={role} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="ds-form__legend">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </legend>
      {hint && <span className="ds-form__hint">{hint}</span>}
      <div className={cx('ds-form__options', inline && 'ds-form__options--inline')}>{children}</div>
      {error && (
        <span id={`${id}-error`} className="ds-form__error" role="alert">
          {error}
        </span>
      )}
    </fieldset>
  )
}

/** One choice from a short list. */
export function RadioGroup({ name, options, value, onChange, required, ...group }: GroupProps & { value?: string; onChange?: (value: string) => void }) {
  return (
    <Group {...group} required={required} role="radiogroup">
      {options.map((o) => (
        <label key={optionValue(o)} className="ds-form__check">
          <input
            type="radio"
            name={name}
            value={optionValue(o)}
            required={required}
            checked={value === undefined ? undefined : value === optionValue(o)}
            onChange={() => onChange?.(optionValue(o))}
          />
          <span>{optionLabel(o)}</span>
        </label>
      ))}
    </Group>
  )
}

/** Any number of choices from a short list. */
export function CheckboxGroup({ name, options, value, onChange, ...group }: GroupProps & { value: string[]; onChange: (value: string[]) => void }) {
  const toggle = (v: string) => onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  return (
    <Group {...group}>
      {options.map((o) => (
        <label key={optionValue(o)} className="ds-form__check">
          <input type="checkbox" name={name} value={optionValue(o)} checked={value.includes(optionValue(o))} onChange={() => toggle(optionValue(o))} />
          <span>{optionLabel(o)}</span>
        </label>
      ))}
    </Group>
  )
}

type RatingProps = Omit<GroupProps, 'name' | 'options' | 'inline'> & {
  value: number
  onChange: (value: number) => void
  max?: number
  /** accessible name of one step, e.g. (n) => `${n} sao` */
  stepLabel?: (n: number) => string
}

/** Star rating, 1 to `max`. */
export function Rating({ value, onChange, max = 5, stepLabel = (n) => `${n} / ${max}`, ...group }: RatingProps) {
  return (
    <Group {...group} inline>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
        <button key={n} type="button" className={cx('ds-form__star', value >= n && 'is-on')} aria-label={stepLabel(n)} aria-pressed={value >= n} onClick={() => onChange(n)}>
          <Icon name="star" size={18} />
        </button>
      ))}
    </Group>
  )
}

/** Cloudflare Turnstile check (renders nothing when no site key is configured). */
export function Captcha({ onToken }: { onToken: (token: string) => void }) {
  return (
    <div className="ds-form__field ds-form__field--full ds-form__captcha">
      <Turnstile onTokenChange={onToken} />
    </div>
  )
}

/** Last row of a form: the submit button(s), with an optional small note beside them. */
export function FormActions({ note, align = 'between', children }: { note?: ReactNode; align?: 'between' | 'center' | 'start'; children: ReactNode }) {
  return (
    <div className={cx('ds-form__actions', `ds-form__actions--${align}`)}>
      {note && <span className="ds-form__note">{note}</span>}
      {children}
    </div>
  )
}

/** Result of a submission (or any notice above / inside a form). `error` is announced immediately. */
export function FormMessage({ tone = 'success', title, children }: { tone?: 'success' | 'error' | 'info'; title?: string; children?: ReactNode }) {
  return (
    <div className={cx('ds-formmsg', `ds-formmsg--${tone}`)} role={tone === 'error' ? 'alert' : 'status'}>
      {title && <p className={cx('ds-formmsg__title', displayClass(title))}>{title}</p>}
      {children && <div className="ds-formmsg__body">{typeof children === 'string' ? <p>{children}</p> : children}</div>}
    </div>
  )
}

/** Kicker, heading and intro copy at the top of a `Block` (above a form, `Rows`, a grid …) — same type as the Rugby blocks' copy. */
export function BlockHeader({ kicker, title, accent, children }: { kicker?: string; title: string; accent?: string; children?: ReactNode }) {
  return (
    <div className="ds-copy ds-blockhead">
      {kicker && <Reveal className={cx('ds-copy__kicker', displayClass(kicker, true))}>{kicker}</Reveal>}
      <Heading tone="deep" accent={accent} accentTone="gold" className="ds-copy__title">
        {title}
      </Heading>
      {children && <Text className="ds-copy__body">{children}</Text>}
    </div>
  )
}
