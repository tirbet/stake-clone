import * as React from "react";

export const RaceIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className="inline-block shrink-0"
      {...props}
    >
      <path
        fill="currentColor"
        d="m20.55 8.11.99-.99a.996.996 0 1 0-1.41-1.41l-.85.85a9 9 0 0 0-5.27-2.5V3h1c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1h1v1.07A8.98 8.98 0 0 0 6.32 7H3.01c-.55 0-1 .45-1 1s.45 1 1 1h5.54c1.1-1.22 2.69-2 4.46-2 3.31 0 6 2.69 6 6s-2.69 6-6 6c-1.77 0-3.36-.78-4.46-2H3c-.55 0-1 .45-1 1s.45 1 1 1h3.3a9 9 0 0 0 8.12 2.89c3.68-.56 6.69-3.44 7.4-7.09.49-2.48-.06-4.82-1.28-6.69z"
      />
      <path
        fill="currentColor"
        d="M3 14h7.18c.4 1.17 1.51 2 2.82 2 1.66 0 3-1.34 3-3s-1.34-3-3-3c-1.31 0-2.42.83-2.82 2H3c-.55 0-1 .45-1 1s.45 1 1 1"
      />
    </svg>
  )
);

RaceIcon.displayName = "RaceIcon";
