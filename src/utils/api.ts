const GENERIC_ERROR = 'Something went wrong. Please try again in a moment.'

export async function extractError(response: Response, fallback?: string): Promise<string> {
  try {
    const data = await response.json()
    return data.detail ?? fallback ?? GENERIC_ERROR
  } catch {
    return GENERIC_ERROR
  }
}
