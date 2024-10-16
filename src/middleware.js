import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req) {
  const response = NextResponse.next();
  
  // Handle URL case normalization
  if (req.nextUrl.pathname === "/AboutUs") {
    return NextResponse.redirect(
      `${req.nextUrl.origin}${req.nextUrl.pathname.toLowerCase()}`
    );
  }

  // Access cookies from the request
  const cookies = req.cookies;
  let location = cookies.get('fetchlocation');

  if (!location) {
    const setLocation = {
      country: 'United-States',
      state: 'New-York',
      city: 'New-York',
      formatted_address: 'New York, NY, USA',
    };
    location = JSON.stringify(setLocation);
    
    response.headers.set('X-fetchlocation', location);
  } else {
    response.cookies.set('fetchlocation', location.value);
    response.headers.set('X-fetchlocation', location.value);
  }
  
  return response;
}

export const config = {
  matcher: ['/:path*'], // Matches all paths
};
