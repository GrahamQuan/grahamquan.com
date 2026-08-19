import { envClient } from '@/lib/env-client';

export default function CloudflareAnalyticsScript() {
  return (
    <script
      defer
      src='https://static.cloudflareinsights.com/beacon.min.js'
      data-cf-beacon={`'{"token": "${envClient.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN}"}'`}
    ></script>
  );
}
