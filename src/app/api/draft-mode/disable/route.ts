import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/** Turns preview off and returns to the normal published site. */
export async function GET(request: Request) {
  const dm = await draftMode();
  dm.disable();
  return NextResponse.redirect(new URL("/", request.url));
}
