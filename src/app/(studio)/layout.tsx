/**
 * Root layout for the admin dashboard.
 *
 * Deliberately separate from the site's layout: the site's CSS reset and font
 * variables would fight Sanity Studio's own styling. Route groups let each have
 * its own <html>/<body>, so the two never touch.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
