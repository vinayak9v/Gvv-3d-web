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
};

export default nextConfig;
