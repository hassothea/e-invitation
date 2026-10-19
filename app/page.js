import InvitationShell from "@/components/InvitationShell";
import { weddingData } from "@/config/weddingData";
import { guestFromSearchParams } from "@/lib/guest";

/**
 * Query-string personalization:
 *   /?to=John+%26+Mary   →  "Dear John & Mary"
 *   /?guest=Aunt+Lisa    →  "Dear Aunt Lisa"
 *   /                    →  "Dear Valued Guest"
 */
export async function generateMetadata({ searchParams }) {
  const params = await searchParams; // works on Next 14 and 15
  const name = guestFromSearchParams(params, weddingData.guest.queryKeys);
  return name ? { title: `${weddingData.meta.title} | For ${name}` } : {};
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const guestName = guestFromSearchParams(params, weddingData.guest.queryKeys);
  return <InvitationShell guestName={guestName} />;
}
