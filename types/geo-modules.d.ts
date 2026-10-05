// d3-geo and topojson-client ship without typings; the world map only needs these few calls.
declare module 'd3-geo' {
  export interface GeoProjection {
    (point: [number, number]): [number, number] | null
    fitExtent(extent: [[number, number], [number, number]], object: unknown): GeoProjection
    rotate(angles: [number, number] | [number, number, number]): GeoProjection
  }
  export interface GeoPath {
    (object: unknown): string | null
    centroid(object: unknown): [number, number]
  }
  export function geoNaturalEarth1(): GeoProjection
  export function geoPath(projection?: GeoProjection): GeoPath
  export function geoInterpolate(a: [number, number], b: [number, number]): (t: number) => [number, number]
}

declare module 'topojson-client' {
  export function feature(
    topology: unknown,
    object: unknown
  ): { features: { id?: string | number; properties: { name: string }; geometry: unknown }[] }
}
