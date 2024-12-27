/* eslint-disable import/order */
/* eslint-disable padding-line-between-statements */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrenUser } from "./lib/getCurrentUser";

// Define routes that don't require authentication
const AuthRoutes = ["/"];

// Define roles and their corresponding routes
type Role = keyof typeof roleBasedRoute;

const roleBasedRoute = {
  OWNER: [/^\/dashboard/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrenUser();

  // If there's no user and the path is not part of the AuthRoutes, redirect to login
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // If the user has a role, check if they are authorized for the requested route
  if (user?.role && roleBasedRoute[user?.role as Role]) {
    const routes = roleBasedRoute[user?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // If the user is not authorized for the route, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

// Configure the routes to match
export const config = {
  matcher: ["/dashboard", "/dashboard/:page*"],
};
