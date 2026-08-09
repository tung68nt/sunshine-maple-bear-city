import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const startTime = Date.now()
  let dbStatus = 'disconnected'
  let dbLatencyMs = -1

  try {
    const { error } = await supabase.from('pages').select('id').limit(1)
    dbLatencyMs = Date.now() - startTime
    if (!error) {
      dbStatus = 'connected'
    } else {
      dbStatus = 'error'
    }
  } catch (err) {
    dbStatus = 'error'
  }

  const memory = process.memoryUsage()
  const memoryRssMb = Math.round((memory.rss / (1024 * 1024)) * 100) / 100

  const isHealthy = dbStatus === 'connected' || process.env.NODE_ENV === 'development'

  return NextResponse.json(
    {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      database: {
        status: dbStatus,
        latencyMs: dbLatencyMs,
      },
      system: {
        uptimeSeconds: Math.round(process.uptime()),
        memoryRssMb: memoryRssMb,
      },
    },
    {
      status: isHealthy ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  )
}
