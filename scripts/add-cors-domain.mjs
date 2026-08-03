/**
 * Adds anchoredpaths.org to Sanity CORS so /admin works on the real domain.
 *   node --use-system-ca scripts/add-cors-domain.mjs
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const token = JSON.parse(
  readFileSync(
    join(process.env.USERPROFILE ?? process.env.HOME ?? "", ".config", "sanity", "config.json"),
    "utf8",
  ),
).authToken;

const origins = ["https://anchoredpaths.org", "https://www.anchoredpaths.org"];

for (const origin of origins) {
  const res = await fetch("https://api.sanity.io/v2021-06-07/projects/j4qcykkp/cors", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ origin, allowCredentials: true }),
  });
  const data = await res.json();
  console.log(origin, data.id ? "✓ added" : data.message ?? JSON.stringify(data));
}
