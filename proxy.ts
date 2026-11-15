import { NextResponse, type NextRequest } from "next/server";
import { RECONCILIATION_ID_PATTERN } from "@/lib/reconciliation/validation";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const prefix = "/reconcile-preview/";
  if (!pathname.startsWith(prefix)) {
    return NextResponse.next();
  }

  const segment = pathname.slice(prefix.length);
  if (!segment || segment.includes("/")) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), {
      status: 404,
    });
  }

  let decoded = segment;
  try {
    decoded = decodeURIComponent(segment).trim();
  } catch {
    return NextResponse.rewrite(new URL("/_not-found", request.url), {
      status: 404,
    });
  }

  if (!RECONCILIATION_ID_PATTERN.test(decoded)) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), {
      status: 404,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/reconcile-preview/:path*"],
};
