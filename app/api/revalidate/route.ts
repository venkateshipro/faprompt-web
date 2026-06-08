import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand ISR revalidation, pinged by WordPress on publish
 * (see /wordpress/functions-snippet.php). Refreshes the affected pages
 * within seconds instead of waiting for the 300s ISR window.
 *
 * Body: { secret, type, slug }
 */
export async function POST(request: Request) {
  try {
    const { secret, type, slug } = await request.json();
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
    }

    // Always refresh the home page (it shows teasers of everything).
    revalidatePath("/");

    if (type === "service") {
      revalidatePath("/services");
      if (slug) revalidatePath(`/services/${slug}`);
    } else if (type === "project") {
      revalidatePath("/work");
    } else if (type === "post") {
      revalidatePath("/blog");
      if (slug) revalidatePath(`/blog/${slug}`);
    } else if (type === "testimonial") {
      revalidatePath("/");
    } else if (type === "page" && slug) {
      revalidatePath(`/${slug}`);
    }

    return NextResponse.json({ ok: true, revalidated: true, type, slug });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
