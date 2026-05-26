'use client';

import { useEffect } from 'react';
import { init } from '@plausible-analytics/tracker';

const DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'mexicotravelsmart.mx';

let initialized = false;

export function PlausibleProvider() {
  useEffect(() => {
    if (initialized) return;
    initialized = true;

    init({
      domain: DOMAIN,
      outboundLinks: true,
      fileDownloads: true,
    });
  }, []);

  return null;
}
