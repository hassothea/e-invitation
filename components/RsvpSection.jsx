"use client";

import Page from "./Page";
import RsvpForm from "./RsvpForm";

export default function RsvpSection({ guestName }) {
  return (
    <Page id="rsvp" className="px-6 py-24 sm:px-14">
      <div className="mx-auto w-full max-w-xl">
        <RsvpForm guestName={guestName} />
      </div>
    </Page>
  );
}
