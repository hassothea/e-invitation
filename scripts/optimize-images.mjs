/**
 * Shrinks your photos for the web.
 *
 *   1. Put your original photos (jpg, jpeg, png, webp) in a folder called  photos-original/
 *   2. Run:   npm run optimize
 *   3. The small versions appear in  public/images/  (same names, .jpg)
 *
 * Portrait 4:5 (1200 x 1500, cropped to the middle of interest), quality 78, no location data.
 * Typical result: a 4 MB phone photo becomes about 150 to 250 KB.
 *
 * Options:   npm run optimize -- <from-folder> <to-folder> [--fit=inside]
 *   --fit=inside   keep each photo's own shape (longest side 1600 px) instead of cropping to 4:5
 */
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("The image tool is not installed yet. Run:  npm install   then try again.");
  process.exit(1);
}

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const [from = "photos-original", to = "public/images"] = args.filter((a) => !a.startsWith("--"));
const keepShape = flags.includes("--fit=inside");

if (!existsSync(from)) {
  console.error(`Folder "${from}" not found. Create it and put your original photos inside.`);
  process.exit(1);
}
mkdirSync(to, { recursive: true });

const files = readdirSync(from).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
if (!files.length) {
  console.error(`No photos found in "${from}".`);
  process.exit(1);
}

const kb = (n) => `${Math.round(n / 1024)} KB`;
let before = 0;
let after = 0;
for (const file of files) {
  const input = path.join(from, file);
  const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const output = path.join(to, `${name}.jpg`);
  const pipeline = sharp(input).rotate(); // .rotate() applies the phone's orientation
  const resized = keepShape
    ? pipeline.resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    : pipeline.resize({ width: 1200, height: 1500, fit: "cover", position: "attention" });
  await resized.jpeg({ quality: 78, mozjpeg: true }).toFile(output);
  const a = statSync(input).size;
  const b = statSync(output).size;
  before += a;
  after += b;
  console.log(`${file}  ${kb(a)}  →  ${output}  ${kb(b)}`);
}
console.log(`\nDone: ${files.length} photos, ${kb(before)} → ${kb(after)}`);
