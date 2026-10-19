import { notFound } from "next/navigation";
import InvitationShell from "@/components/InvitationShell";
import { weddingData } from "@/config/weddingData";
import { getGuestName } from "@/lib/guest";

/**
 * Path-style personalization (optional alternative to ?to=):
 *   /john-and-mary     →  "Dear John And Mary"
 *   /John-%26-Mary     →  "Dear John & Mary"
 */
export async function generateMetadata({ params }) {
  const { guest } = await params;
  const name = getGuestName(guest, { fromSlug: true });
  return name ? { title: `${weddingData.meta.title} | For ${name}` } : {};
}

// Browsers sometimes request /favicon.ico, /robots.txt, etc. Don't treat those as guests.
const FILE_LIKE = /\.(ico|png|jpe?g|gif|webp|svg|txt|xml|json|webmanifest|map|css|js)$/i;

export default async function GuestPage({ params }) {
  const { guest } = await params;
  let decoded = guest;
  try {
    decoded = decodeURIComponent(guest);
  } catch {
    /* malformed % sequence: treat as a plain name */
  }
  if (FILE_LIKE.test(decoded)) notFound();
  return <InvitationShell guestName={getGuestName(guest, { fromSlug: true })} />;
}
