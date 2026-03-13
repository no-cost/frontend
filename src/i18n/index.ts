import { createI18n } from 'vue-i18n'

import en from '@/i18n/locales/en'
import sk from '@/i18n/locales/sk'

export type Locale = 'en' | 'sk'

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'sk', label: 'Slovenčina' },
]

const SUPPORTED_LOCALES = new Set<string>(LOCALES.map((l) => l.code))

function detectLocale(): Locale {
  const saved = localStorage.getItem('locale')
  if (saved && SUPPORTED_LOCALES.has(saved)) return saved as Locale

  // "sk", "sk-SK" -> "sk"
  for (const lang of navigator.languages) {
    const code = lang.split('-')[0]!
    if (SUPPORTED_LOCALES.has(code)) return code as Locale
  }

  return 'en'
}

const savedLocale = detectLocale()
document.documentElement.lang = savedLocale

const i18n = createI18n({
  legacy: true,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: { en, sk },
})

export function setLocale(locale: Locale) {
  i18n.global.locale = locale
  localStorage.setItem('locale', locale)
  document.documentElement.lang = locale
}

export default i18n
