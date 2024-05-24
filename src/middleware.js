export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const token = await getToken({ req: request });

  let url = request.nextUrl.pathname;

  if (token && ["/sign-in", "/sign-up"].includes(url)) return NextResponse.redirect(new URL("/", request.url));

  if (!token && ["/"].includes(url)) return NextResponse.redirect(new URL("/sign-in", request.url));
}
