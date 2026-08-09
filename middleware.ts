import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check demo/local session cookie
  const hasDemoSession = request.cookies.has('smb_admin_session')

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
              supabaseResponse = NextResponse.next({
                request,
              })
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              )
            },
          },
        }
      )

      const {
        data: { user },
      } = await supabase.auth.getUser()

      // Protect /admin routes: allow if Supabase user OR demo session cookie exists
      if (request.nextUrl.pathname.startsWith('/admin') && !user && !hasDemoSession) {
        const redirectUrl = new URL('/login', request.url)
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.warn('Supabase auth check skipped in middleware:', error)
      if (request.nextUrl.pathname.startsWith('/admin') && !hasDemoSession) {
        const redirectUrl = new URL('/login', request.url)
        return NextResponse.redirect(redirectUrl)
      }
    }
  } else {
    // If Supabase credentials are missing, check session cookie for /admin
    if (request.nextUrl.pathname.startsWith('/admin') && !hasDemoSession) {
      const redirectUrl = new URL('/login', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
