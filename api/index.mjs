import { Buffer } from "node:buffer";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverModule = await import(new URL("../.output/server/index.mjs", import.meta.url));
const server = serverModule.default ?? serverModule;

async function getRequestBody(req) {
  if (req.method === "GET" || req.method === "HEAD") {
    return null;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return chunks.length ? Buffer.concat(chunks) : null;
}

export default async function handler(req, res) {
  const protocol = String(req.headers["x-forwarded-proto"] ?? "https");
  const host = String(req.headers.host ?? "localhost");
  const url = new URL(req.url ?? "", `${protocol}://${host}`);
  const body = await getRequestBody(req);

  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body,
  });

  const response = await server.fetch(request, {}, {});

  res.statusCode = response.status;
  for (const [key, value] of response.headers) {
    res.setHeader(key, value);
  }

  const responseBody = await response.arrayBuffer();
  res.end(Buffer.from(responseBody));
}
