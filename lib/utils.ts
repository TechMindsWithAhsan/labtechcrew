import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const NUMBER_WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six',
  'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
]

/**
 * Spell a small number for prose: `numberWord(9)` → "nine".
 *
 * ⚠️ This exists so copy can say "Nine services" while the NINE comes from the
 * data. Counts typed by hand rot: the homepage said "Ten services" for weeks
 * after two were removed, contradicting the services page two clicks away, and
 * the Recent work strip said "uLoad" for months after the client was renamed.
 * Anything countable that is stored as data should be counted, not typed.
 *
 * Above twelve it falls back to digits, which is also the house style.
 */
export function numberWord(n: number, capitalise = false): string {
  const word = NUMBER_WORDS[n] ?? String(n)
  return capitalise ? word.charAt(0).toUpperCase() + word.slice(1) : word
}
