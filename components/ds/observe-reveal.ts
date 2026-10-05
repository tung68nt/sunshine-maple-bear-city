/**
 * One shared IntersectionObserver for every reveal in the system (Rugby's `.delay`
 * behaviour): an element gets `is-in` the first time it touches the viewport and is
 * then left alone.
 */
let io: IntersectionObserver | null = null

export function observeReveal(el: Element): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    el.classList.add('is-in')
    return () => {}
  }
  io ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('is-in')
        io?.unobserve(e.target)
      }),
    { root: null, rootMargin: '0px', threshold: 0 }
  )
  io.observe(el)
  return () => io?.unobserve(el)
}
