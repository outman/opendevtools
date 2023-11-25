import { NextResponse } from 'next/server'


export function middleware(request) {
  let token = request.headers.get("X-Token") || '';
  let accessToken = process.env.ACCESSTOKEN || '';
  if (accessToken && accessToken !== token) {
    return Response.json(
      { success: false, message: 'authentication failed' },
      { status: 401 }
    );
  }
  let response = NextResponse.next({
    request: request,
  });
  return response;
}

export const config = {
  matcher: '/api/:path*',
}