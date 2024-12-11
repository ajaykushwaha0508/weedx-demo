import { NextRequest, NextResponse } from 'next/server';
import countries from  "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

export async function middleware(req) {
  const response = NextResponse.next();
    if (req.nextUrl.pathname === "/AboutUs") {
    return NextResponse.redirect(
      `${req.nextUrl.origin}${req.nextUrl.pathname.toLowerCase()}`
    );
  }
  const cookies = req.cookies;
  let location = cookies.get('fetchlocation');
  if (!location) {
    const setLocation = {
      country: 'United-States',
      state: 'New-York',
      city: 'New-York',
      formatted_address: 'New York, NY, USA',
      country_code: "US"
    };
    location = JSON.stringify(setLocation);
    
    response.headers.set('X-fetchlocation', location);
    response.cookies.set('locale', "en-US" , { path: '/' });
  } else {
    response.cookies.set('fetchlocation', location.value , {
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    response.headers.set('X-fetchlocation', location.value);
    const primaryLanguage = 'en'; 
    const countryCode = countries.getAlpha2Code(JSON.parse(location.value).country, "en") || "US";
    const locale = `${primaryLanguage}-${countryCode}`;
    response.cookies.set('locale', locale, { path: '/' });
  }
  return response;
}

export const config = {
  matcher: ['/:path*'], // Matches all paths
};
