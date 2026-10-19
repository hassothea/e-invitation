/**
 * Sends an RSVP using whichever mode is set in config/weddingData.js.
 * `data` = { name, attending, guests, message }
 * Throws an Error (with a guest-friendly message) if sending fails.
 */
export async function submitRsvp(cfg, data) {
  switch (cfg.mode) {
    case "formspree": {
      const res = await fetch(cfg.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("We couldn't send your reply. Please try again.");
      return;
    }

    case "googleForm": {
      // Google Forms doesn't allow reading the response cross-origin,
      // so we send with no-cors and treat a completed request as success.
      const body = new URLSearchParams();
      Object.entries(cfg.googleForm.fields).forEach(([key, entryId]) => {
        body.append(entryId, data[key] ?? "");
      });
      await fetch(cfg.googleForm.action, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      return;
    }

    case "whatsapp": {
      const text = summary(data);
      window.open(
        `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener"
      );
      return;
    }

    case "email": {
      const subject = encodeURIComponent(`RSVP from ${data.name}`);
      window.location.href = `mailto:${cfg.email}?subject=${subject}&body=${encodeURIComponent(summary(data))}`;
      return;
    }

    default:
      // "demo": pretend to send so you can preview the success state.
      await new Promise((resolve) => setTimeout(resolve, 700));
      console.info("[RSVP demo mode: nothing was sent]", data);
  }
}

function summary(d) {
  return [
    `RSVP from ${d.name}`,
    `Reply: ${d.attending}`,
    d.guests && d.guests !== "0" ? `Guests: ${d.guests}` : null,
    d.message ? `Message: ${d.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
