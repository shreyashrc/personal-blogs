import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const enable = searchParams.get("enable") !== "0";
  const redirectTo = searchParams.get("redirect") || "/blog";

  const res = NextResponse.redirect(new URL(redirectTo, req.url));
  if (enable) {
    res.cookies.set("preview_drafts", "1", { path: "/", httpOnly: false, maxAge: 60 * 60 * 24 });
  } else {
    res.cookies.set("preview_drafts", "", { path: "/", httpOnly: false, maxAge: 0 });
  }
  return res;
}

