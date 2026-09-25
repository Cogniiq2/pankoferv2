import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * The proposal is fully prerendered and never revalidates, so prerendered
 * pages are served read-only from Workers static assets. This needs no R2
 * bucket or KV namespace, which keeps deployment free of external resources.
 * See https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
