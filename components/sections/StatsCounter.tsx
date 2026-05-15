'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 500, suffix: '+', label: 'Students' },
  { value: 15, suffix: '+', label: 'Years of Excellence' },
  { value: 98, suffix: '%', label: 'Parent Satisfaction' },
  { value: 20, suffix: '+', label: 'Certified Educators' },
]

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)

  useEffect(() => {
    if (!isVisible) return
    
    let startTime: number | null = null
    let frameId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // easeOutExpo for a more premium feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      const nextCount = Math.floor(eased * target)
      if (nextCount !== countRef.current) {
        setCount(nextCount)
        countRef.current = nextCount
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [isVisible, target, duration])

  return count
}

function StatItem({ value, suffix, label, isVisible }: {
  value: number; suffix: string; label: string; isVisible: boolean
}) {
  const count = useCountUp(value, isVisible)
  return (
    <div className="flex flex-col items-center text-center p-6 transition-transform duration-700 hover:scale-105">
      <div className="stat-number mb-2 whitespace-nowrap text-white font-display font-bold">
        {count}{suffix}
      </div>
      <p className="text-white/80 text-xs md:text-sm font-medium tracking-widest uppercase">{label}</p>
    </div>
  )
}

export function StatsCounter() {
  const containerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing to prevent resets
          if (containerRef.current) observer.unobserve(containerRef.current)
        }
      },
      { 
        threshold: 0.1, // Lower threshold for better mobile reliability
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it comes into full view
      }
    )
    
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={containerRef} className="relative py-20 bg-[var(--color-primary)] overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2">
          <svg width="200" height="200" viewBox="0 0 14 14" fill="white">
            <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z" />
          </svg>
        </div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2">
          <svg width="150" height="150" viewBox="0 0 14 14" fill="white">
            <path d="M6.7552516 12.9749c0-.014.026-.6078.057-1.3203.07-1.5937.069-1.5091.014-1.5845-.05-.069-.1077-.1023-.1772-.1023-.083 0-.6683.078-1.4387.1904-.7811.1145-1.2022.1714-1.2088.1634 0 0 .049-.178.114-.3894.1362-.4432.1431-.4966.081-.6202-.037-.072-.1235-.1458-1.3903-1.174-.7431-.6032-1.3498-1.1029-1.3482-1.1104 0-.01.1399-.078.3074-.1559.1674-.078.3208-.1578.3409-.1767.047-.044.06-.1153.039-.2162-.01-.044-.1191-.4536-.2445-.9098-.1254-.4562-.2262-.831-.224-.8328 0 0 .3498.069.7726.1586.4228.089.7944.1619.8258.1619.071 0 .1472-.039.186-.096.016-.024.073-.1961.1262-.3829.053-.1868.101-.3477.1063-.3576.01-.012.2307.2294.6279.6742.34.3808.6426.7132.6725.7388.063.054.1597.085.2205.072.09-.02.1459-.1186.1458-.2569 0-.039-.1214-.7149-.2696-1.5015-.1483-.7867-.2675-1.4324-.2648-1.4351 0 0 .196.092.4297.2111.4084.2074.4284.2159.5121.2164.1052.0006.1874-.04.2375-.1163.018-.028.2467-.4496.5077-.937.2609-.4873.4788-.8861.4842-.8861.01 0 .2234.3988.4845.8861.261.4874.4894.9087.5074.9363.037.056.099.098.1693.1137.098.022.1873-.011.6018-.223.2219-.1136.4057-.2042.4084-.2014 0 0-.1162.6486-.2645 1.4353-.1502.7968-.2696 1.4661-.2696 1.5111-.0001.1929.1119.2909.2654.2322.036-.014.086-.043.1113-.065.025-.022.3239-.3516.6633-.7316.3964004-.444.6204004-.6845.6266004-.6729.01.01.053.1708.1064.3576.053.1868.1099.3591.1262.3829.039.057.1148.096.1859.096.032 0 .4031-.073.8259-.1619.4228-.089.7704-.1604.7726-.1586 0 0-.1026.3902-.2328.863s-.2401.8987-.2442.9464c-.011.1313.011.1499.3886.3264.1717.08.3122.1507.3122.1566 0 .01-.6085.5047-1.3523 1.1084-1.2679004 1.0292-1.3548004 1.1025-1.3915004 1.175-.063.1236-.056.177.081.6202.065.2114.1163.3866.114.3894-.01.01-.4278-.049-1.2088-.1634-.7893-.1157-1.3563-.1904-1.4447-.1904-.069 0-.1496.065-.1857.1494-.023.054-.022.1261.01 1.3025.018.6851.033 1.3208.034 1.4128l.0008.1673h-.2206c-.2007 0-.2207 0-.2206-.025z" />
          </svg>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/20">
          {stats.map((stat, idx) => (
            <StatItem key={idx} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
