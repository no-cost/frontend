import i18n from '@/i18n'

function genericError(): string {
  return (i18n.global as any).t('common.genericError')
}

export async function extractError(response: Response, fallback?: string): Promise<string> {
  try {
    const data = await response.json()
    return data.detail ?? fallback ?? genericError()
  } catch {
    return genericError()
  }
}
