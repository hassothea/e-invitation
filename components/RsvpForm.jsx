"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { weddingData } from "@/config/weddingData";
import { submitRsvp } from "@/lib/rsvp";

const field =
  "w-full rounded-xl border border-gold/40 bg-black/25 px-4 py-3 text-ink outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

export default function RsvpForm({ guestName = "" }) {
  const { rsvp } = weddingData;
  const [form, setForm] = useState({ name: guestName, attending: "yes", guests: "1", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const attending = form.attending === "yes";

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Please enter your name so we know who is replying.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await submitRsvp(rsvp, {
        name: form.name.trim(),
        attending: rsvp.labels[form.attending],
        guests: attending ? form.guests : "0",
        message: form.message.trim(),
      });
      setStatus("success");
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
<<<<<<< HEAD
    <div className="rounded-[1.25rem] border border-gold/40 bg-black/20 p-6 shadow-petal sm:p-8">
=======
    <div className="rounded-[1.25rem] border border-gold/40 bg-black/20 p-6 shadow-petal backdrop-blur-sm sm:p-8">
>>>>>>> 628a69eb273ca9052674eb3fa842ee740de8610f
      <h3 className="font-display text-4xl"><span className="gold-text">Will you join us?</span></h3>
      <p className="mt-1 text-ink/75">Please reply by {rsvp.deadline}.</p>

      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl bg-black/25 p-6 text-center"
          >
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-gold text-wine">
              <Check className="size-6" aria-hidden="true" />
            </span>
            <p className="mt-4 font-display text-3xl text-gold-light">Thank you, {form.name.trim()}.</p>
            <p className="mt-1 text-ink/80">{attending ? rsvp.successYes : rsvp.successNo}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-5"
          >
            <div>
              <label htmlFor="rsvp-name" className="mb-1.5 block text-sm font-medium text-gold-light">
                Your name
              </label>
              <input
                id="rsvp-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
                className={field}
                required
              />
            </div>

            <fieldset>
              <legend className="mb-1.5 text-sm font-medium text-gold-light">Can you make it?</legend>
              <div className="grid grid-cols-2 gap-3">
                {["yes", "no"].map((value) => (
                  <label key={value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="attending"
                      value={value}
                      checked={form.attending === value}
                      onChange={set("attending")}
                      className="peer sr-only"
                    />
                    <span className="block rounded-xl border border-gold/40 bg-black/25 px-3 py-3 text-center text-sm font-medium text-ink transition peer-checked:border-gold peer-checked:bg-gold peer-checked:text-wine peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2">
                      {value === "yes" ? "Joyfully accept" : "Regretfully decline"}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {attending && (
              <div>
                <label htmlFor="rsvp-guests" className="mb-1.5 block text-sm font-medium text-gold-light">
                  Number of guests (including you)
                </label>
                <select id="rsvp-guests" value={form.guests} onChange={set("guests")} className={field}>
                  {Array.from({ length: rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="rsvp-message" className="mb-1.5 block text-sm font-medium text-gold-light">
                A note for the couple <span className="font-normal text-ink/60">(optional)</span>
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                value={form.message}
                onChange={set("message")}
                className={`${field} resize-none`}
              />
            </div>

            <div aria-live="polite" className="min-h-5 text-sm text-gold-light">
              {status === "error" && error}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-wine transition hover:bg-gold-light disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden="true" /> Sending reply
                </>
              ) : (
                <>
                  <Send className="size-5" aria-hidden="true" /> Send reply
                </>
              )}
            </button>

            {rsvp.mode === "demo" && (
              <p className="text-center text-xs text-ink/55">
                Preview mode: replies aren&apos;t sent yet. Set <code>rsvp.mode</code> in config/weddingData.js.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
