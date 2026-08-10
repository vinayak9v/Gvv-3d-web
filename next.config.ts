import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Origins (other than localhost) allowed to load the dev server's internal
  // client/HMR runtime. If the origin you open the dev server from is NOT listed,
  // Next blocks its /_next dev resources, so the page renders server-side but
  // never hydrates — leaving R3F canvases blank and buttons unclickable over LAN.
  // Add every host/IP/domain you access the dev server from here.
  allowedDevOrigins: [
    '72.61.224.202',
    '192.168.1.5',
    '10.0.0.251',
    'garima.tinu.pro',
    '*.tinu.pro',
    // Allow any private-LAN address so phones/other PCs on the network work too.
    '192.168.*.*',
    '10.0.*.*',
  ],
  // Let Cloudflare (and browsers) cache the heavy static media at the edge, so a
  // proxied/tunnelled origin isn't re-fetching the whole clip on every load.
  // NOTE: filenames here are stable, so if you re-encode lab.mp4 you must bump
  // its name (e.g. lab-v2.mp4) or purge the Cloudflare cache to avoid stale video.
  async headers() {
    return [
      {
        source: '/:file*.(mp4|webm|glb|gltf|hdr|wasm)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
