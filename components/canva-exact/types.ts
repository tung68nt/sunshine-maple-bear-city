export type CvText = {
  t: string; x: number; y: number; f: string; s: number; c: string
  ls?: number; o?: number; hidden?: boolean; tag?: 'h1' | 'h2' | 'h3' | 'p'
}
export type CvLink = { x: number; y: number; w: number; h: number; href: string; label: string }
export type CvField = {
  name: string; label: string; type: 'text' | 'tel' | 'email' | 'date' | 'textarea'
  x: number; y: number; w: number; h: number; required: boolean
}
export type CvForm = { x: number; y: number; anchorY: number; fields: CvField[] }
export type CvPageData = {
  slug: string; title?: string; route?: string; width: number; height: number
  bg: { src: string; y: number; h: number }[]
  text: CvText[]; links: CvLink[]; form: CvForm | null; overlay?: string
}
