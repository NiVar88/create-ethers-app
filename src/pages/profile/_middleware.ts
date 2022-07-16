import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { configs } from '@/constants'

// export const config = {
//   matcher: ['/profile/:path*']
// }

export function middleware(request: NextRequest) {
  // request.cookies.get(configs.APP_AUTH_ACCESS)

  return NextResponse.redirect(new URL('/labs', request.url))
}
