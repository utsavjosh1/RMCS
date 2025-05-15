"use client";

import { VERSION } from "@/config/version";

export function VersionDisplay() {
  return (
    <div className="fixed bottom-2 right-2 text-xs text-gray-500">
      v{VERSION.full}
      {VERSION.build !== 'dev' && `+${VERSION.build}`}
    </div>
  );
} 