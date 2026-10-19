/**
 * Turns guests.txt (one guest or family per line) into personalized links.
 *
 *   npm run links -- https://your-wedding.vercel.app
 *
 * Prints the list and also writes guest-links.csv (open it in Excel / Sheets).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const base = (process.argv[2] || "https://your-wedding.vercel.app").replace(/\/+$/, "");
const file = "guests.txt";

if (!existsSync(file)) {
  console.error(`Could not find ${file}. Create it with one guest name per line.`);
  process.exit(1);
}

const names = readFileSync(file, "utf8")
  .split(/\r?\n/)
  .map((n) => n.trim())
  .filter(Boolean);

const rows = names.map((name) => {
  const url = `${base}/?to=${encodeURIComponent(name).replace(/%20/g, "+")}`;
  return { name, url };
});

rows.forEach((r) => console.log(`${r.name}\n  ${r.url}`));

const csv = ["Guest,Link", ...rows.map((r) => `"${r.name.replace(/"/g, '""')}","${r.url}"`)].join("\n");
writeFileSync("guest-links.csv", csv);
console.log(`\nWrote ${rows.length} links to guest-links.csv`);
