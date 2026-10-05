/**
 * Countries with Maple Bear schools, taken from Maple Bear Global Schools' own
 * "Find A School" directory (https://www.maplebear.ca/find-a-school/, read 2026-10-05).
 * `id` is the ISO 3166-1 numeric code used by world-atlas (topojson/world-atlas on GitHub);
 * `at` is [longitude, latitude] of the capital, used only to place the pin.
 * Hong Kong is listed separately by Maple Bear but counted with China (38 countries).
 */
export type MapleBearCountry = {
  id: string
  name: string
  at: [number, number]
  site?: string
  note?: string
  /** drawn as a pin only: too small to exist as a shape at 1:110m */
  pinOnly?: boolean
}

export const MAPLE_BEAR_COUNTRIES: MapleBearCountry[] = [
  { id: '008', name: 'Albania', at: [19.82, 41.33], site: 'https://www.maplebear-cee.com/' },
  { id: '024', name: 'Angola', at: [13.23, -8.84], site: 'https://www.maplebearangola.com' },
  { id: '036', name: 'Australia', at: [149.13, -35.28], site: 'https://maplebear.com.au/' },
  { id: '050', name: 'Bangladesh', at: [90.41, 23.81], site: 'https://www.maplebearsouthasia.com/' },
  { id: '076', name: 'Brazil', at: [-47.88, -15.79], site: 'http://www.maplebear.com.br/' },
  { id: '100', name: 'Bulgaria', at: [23.32, 42.7], site: 'https://www.maplebear-cee.com/' },
  { id: '124', name: 'Canada', at: [-123.12, 49.28], site: 'https://www.maplebear.ca', note: 'Maple Bear headquarters' },
  { id: '156', name: 'China', at: [116.41, 39.9], site: 'http://www.maplebear.cn/' },
  { id: '180', name: 'DR Congo', at: [15.27, -4.44], site: 'https://maplebearkinshasagombe.com/' },
  { id: '288', name: 'Ghana', at: [-0.19, 5.6], site: 'https://www.maplebearghana.com/' },
  { id: '300', name: 'Greece', at: [23.73, 37.98] },
  { id: '320', name: 'Guatemala', at: [-90.51, 14.63], site: 'https://maplebearlatam.com/' },
  { id: '344', name: 'Hong Kong, China', at: [114.17, 22.32], site: 'https://www.maplebear.hk/', pinOnly: true },
  { id: '356', name: 'India', at: [77.21, 28.61], site: 'https://www.maplebearsouthasia.com/' },
  { id: '368', name: 'Iraq', at: [44.37, 33.31], site: 'http://maplebeariraq.com/' },
  { id: '398', name: 'Kazakhstan', at: [71.43, 51.13], site: 'https://maplebear.kz' },
  { id: '404', name: 'Kenya', at: [36.82, -1.29], site: 'https://www.maplebeareastafrica.com/' },
  { id: '458', name: 'Malaysia', at: [101.69, 3.14], site: 'https://www.maplebear.sg/' },
  { id: '484', name: 'Mexico', at: [-99.13, 19.43], site: 'http://maplebearlatam.com/' },
  { id: '504', name: 'Morocco', at: [-6.84, 34.02], site: 'https://www.maplebear-maroc.ma' },
  { id: '524', name: 'Nepal', at: [85.32, 27.72], site: 'https://www.maplebearsouthasia.com/' },
  { id: '512', name: 'Oman', at: [58.41, 23.59], site: 'https://www.maplebeargulfschools.com/' },
  { id: '600', name: 'Paraguay', at: [-57.58, -25.26], site: 'https://maplebearlatam.com/' },
  { id: '604', name: 'Peru', at: [-77.04, -12.05], site: 'http://maplebearlatam.com/' },
  { id: '608', name: 'Philippines', at: [120.98, 14.6], site: 'https://www.maplebear.sg/' },
  { id: '616', name: 'Poland', at: [21.01, 52.23], site: 'https://www.maplebear-cee.com/' },
  { id: '620', name: 'Portugal', at: [-9.14, 38.72], site: 'https://www.maplebear.pt/' },
  { id: '642', name: 'Romania', at: [26.1, 44.43], site: 'https://www.maplebear-cee.com/' },
  { id: '688', name: 'Serbia', at: [20.46, 44.79], site: 'https://www.maplebear-cee.com/' },
  { id: '702', name: 'Singapore', at: [103.82, 1.35], site: 'https://www.maplebear.sg/', pinOnly: true },
  { id: '410', name: 'South Korea', at: [126.98, 37.57], site: 'http://www.maplebear.co.kr/' },
  { id: '144', name: 'Sri Lanka', at: [79.86, 6.93], site: 'https://www.maplebearsouthasia.com/' },
  { id: '764', name: 'Thailand', at: [100.5, 13.76], site: 'https://www.maplebear.sg/' },
  { id: '792', name: 'Turkey', at: [32.86, 39.93], site: 'http://www.maplebear.com.tr/' },
  { id: '804', name: 'Ukraine', at: [30.52, 50.45], site: 'https://www.maplebear-cee.com/' },
  { id: '784', name: 'United Arab Emirates', at: [54.37, 24.45], site: 'https://www.maplebear.ae/' },
  { id: '840', name: 'United States of America', at: [-77.04, 38.91], site: 'https://www.maplebearusa.com/' },
  { id: '860', name: 'Uzbekistan', at: [69.24, 41.3], site: 'http://maplebear.uz/' },
  { id: '704', name: 'Vietnam', at: [105.85, 21.03], site: 'https://maplebearvietnam.edu.vn/', note: 'Sunshine Maple Bear · Hanoi' },
]

/** Hong Kong is a separate directory entry but not a separate country. */
export const MAPLE_BEAR_COUNTRY_COUNT = MAPLE_BEAR_COUNTRIES.filter((c) => c.id !== '344').length
