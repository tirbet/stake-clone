import * as React from "react";

export const SecurityIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      data-ds-icon="Security"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block shrink-0"
      ref={ref}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.18 3a2.12 2.12 0 0 1 1.64 0l7.08 2.57c.73.31 1.2 1 1.2 1.77v1.65c0 8.62-4.98 11.2-7.57 12.61-.95.52-2.11.52-3.06 0C7.88 20.18 2.9 17.61 2.9 8.99V7.34c0-.76.47-1.46 1.2-1.77zM12 7a2.5 2.5 0 0 0-2.5 2.5c0 1.03.62 1.9 1.5 2.29V15c0 .55.45 1 1 1s1-.45 1-1v-3.21c.88-.39 1.5-1.27 1.5-2.29A2.5 2.5 0 0 0 12 7"
      />
    </svg>
  )
);

SecurityIcon.displayName = "SecurityIcon";
