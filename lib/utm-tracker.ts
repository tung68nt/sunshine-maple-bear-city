// Utility helper for capturing and storing UTM Marketing parameters & client metadata

export interface UtmParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  ref?: string
}

export interface ClientMetadata {
  ip?: string
  userAgent?: string
  referrer?: string
  pagePath?: string
  city?: string
  country?: string
}

const STORAGE_KEY = 'smb_utm_params'

/**
 * Parses UTM parameters from URL search string and saves to localStorage
 */
export function captureUtmFromUrl(): UtmParams {
  if (typeof window === 'undefined') return {}

  const urlParams = new URLSearchParams(window.location.search)
  const utmSource = urlParams.get('utm_source')
  const utmMedium = urlParams.get('utm_medium')
  const utmCampaign = urlParams.get('utm_campaign')
  const utmTerm = urlParams.get('utm_term')
  const utmContent = urlParams.get('utm_content')
  const ref = urlParams.get('ref') || document.referrer

  if (utmSource || utmMedium || utmCampaign) {
    const params: UtmParams = {
      utm_source: utmSource || undefined,
      utm_medium: utmMedium || undefined,
      utm_campaign: utmCampaign || undefined,
      utm_term: utmTerm || undefined,
      utm_content: utmContent || undefined,
      ref: ref || undefined,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(params))
    } catch (e) {
      console.warn('Could not store UTM parameters:', e)
    }
    return params
  }

  // Fallback to stored parameters if existing
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {}

  return { ref: document.referrer || undefined }
}

/**
 * Retrieves currently stored UTM parameters
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {}
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {}
  return { ref: typeof document !== 'undefined' ? document.referrer : undefined }
}
