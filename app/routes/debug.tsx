import type { LoaderFunctionArgs } from "react-router";

export async function loader({ context }: LoaderFunctionArgs) {
  const env = (context as any).cloudflare?.env ?? {};

  return Response.json({
    test: "remix-preview-override-test",
    vars: {
      PREVIEW_ENV: env.PREVIEW_ENV ?? "NOT SET",
      name: env.name ?? "NOT SET",
    },
    secrets: {
      MY_PREVIEW_SECRET: env.MY_PREVIEW_SECRET ? "SET (hidden)" : "NOT SET",
      SLACK_WEBHOOK_URL: env.SLACK_WEBHOOK_URL ? "SET (hidden)" : "NOT SET",
    },
    bindings: {
      KV_BINDING_2: env.KV_BINDING_2 ? "BOUND" : "NOT BOUND",
      bucket: env.bucket ? "BOUND" : "NOT BOUND",
      VERSION_TRACKER: env.VERSION_TRACKER ? "BOUND" : "NOT BOUND",
    },
    timestamp: new Date().toISOString(),
  });
}

export default function Debug() {
  return <pre>Use /debug as JSON endpoint</pre>;
}
