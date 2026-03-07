type Theme = 'light' | 'dark' | 'system'

function resolveTheme(theme: Theme): boolean {
  return (
    theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  )
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = resolveTheme(theme) ? 'dark' : 'light'
}

export function getTheme(): Theme {
  return (localStorage.getItem('theme') as Theme) ?? 'system'
}

export function setTheme(theme: Theme) {
  if (theme === 'system') {
    localStorage.removeItem('theme')
  } else {
    localStorage.setItem('theme', theme)
  }
  applyTheme(theme)
}

export function toggleTheme() {
  setTheme(isDark() ? 'light' : 'dark')
}

export function isDark(): boolean {
  return document.documentElement.dataset.theme === 'dark'
}
