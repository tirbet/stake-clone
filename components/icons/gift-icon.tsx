import * as React from "react";

export const GiftIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      data-ds-icon="Gift"
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
        d="M21 5h-3.35c.22-.46.35-.96.35-1.5C18 1.57 16.43 0 14.5 0c-.98 0-1.86.41-2.5 1.06A3.5 3.5 0 0 0 9.5 0C7.57 0 6 1.57 6 3.5c0 .54.13 1.04.35 1.5H3c-1.1 0-2 .9-2 2v1c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-6.5-3c.83 0 1.5.67 1.5 1.5S15.33 5 14.5 5 13 4.33 13 3.5 13.67 2 14.5 2M8 3.5C8 2.67 8.67 2 9.5 2s1.5.67 1.5 1.5S10.33 5 9.5 5 8 4.33 8 3.5M3 21c0 1.1.9 2 2 2h6V12H3zm10 2h6c1.1 0 2-.9 2-2v-9h-8z"
      />
    </svg>
  )
);

GiftIcon.displayName = "GiftIcon";
