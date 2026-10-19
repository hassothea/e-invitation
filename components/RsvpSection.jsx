"use client";

<<<<<<< HEAD
import Page from "./Page";
=======
import SectionFade from "./SectionFade";
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
import RsvpForm from "./RsvpForm";

export default function RsvpSection({ guestName }) {
  return (
<<<<<<< HEAD
    <Page id="rsvp" className="px-6 py-24 sm:px-14">
      <div className="mx-auto w-full max-w-xl">
        <RsvpForm guestName={guestName} />
      </div>
    </Page>
=======
    <SectionFade id="rsvp" className="px-6 py-24 sm:px-14">
      <div className="mx-auto w-full max-w-xl">
        <RsvpForm guestName={guestName} />
      </div>
    </SectionFade>
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
  );
}
