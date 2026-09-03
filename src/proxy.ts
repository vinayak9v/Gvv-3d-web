import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TEMPORARILY DISABLED (per request): /admin no longer requires login — this
// gate is a no-op for now. To re-enable password protection, restore the
// isValidSessionToken check + redirect-to-login below (see git history), and
// also revert the matching bypass in isAuthorizedAdminRequest (src/lib/auth.ts).
export async function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
