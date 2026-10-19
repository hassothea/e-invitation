/** One page of the invitation. It fills the screen; if its content is taller, the page scrolls inside itself. */
export default function Page({ id, className = "", children }) {
  return (
    <section id={id} className={`relative flex min-h-full w-full flex-col justify-center ${className}`}>
      {children}
    </section>
  );
}
