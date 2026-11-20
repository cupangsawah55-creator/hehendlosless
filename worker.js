import { createBitChordAuth } from "./bitchord-addon-auth.mjs";

const auth = createBitChordAuth({
  hosts: ["hehehend.cupangsawah55.workers.dev"]
});

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/__health" && request.method === "GET") {
      return json({
        addon: "HEHEHEND LOSSLESS",
        version: "2.1.0",
        worker: "online"
      });
    }

    if (url.pathname === "/__auth-check") {
      if (request.method !== "GET") {
        return json({ error: "Method not allowed" }, 405);
      }

      const denied = await auth.guard(request);
      if (denied) return denied;

      return json({
        authenticated: true,
        addon: "HEHEHEND LOSSLESS"
      });
    }

    return json({ error: "Not found" }, 404);
  }
};
