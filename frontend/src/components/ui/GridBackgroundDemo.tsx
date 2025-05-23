import React from "react";
import { cn } from "../../lib/utils";

export function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Grade branca com opacidade leve */}
      <div
        className={cn(
          "absolute inset-0 bg-black",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)]"
        )}
      />

      {/* Fade radial suave */}
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black_100%)]" />
    </div>
  );
}
