import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET() {
  const startTime = Date.now()
  let dbStatus = 'disconnected'
  let dbLatencyMs = -1

  try {
    const supabase = await createServerSupabaseClient()
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

  const isHealthy = dbStatus === 'connected' || process.env.NODE_ENV === 'development'

  return NextResponse.json(
    {
      status: isHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      database: {
        status: dbStatus,
        // Avoid exposing fine-grained infrastructure telemetry from a public endpoint.
        latencyMs: dbLatencyMs >= 0 ? dbLatencyMs : null,
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
