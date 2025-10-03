import * as React from "react";

export const ChatIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      data-ds-icon="Chat"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block shrink-0"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10v3l4-3h2c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M8 13c-.83 0-1.5-.67-1.5-1.5S7.17 10 8 10s1.5.67 1.5 1.5S8.83 13 8 13m4 0c-.83 0-1.5-.67-1.5-1.5S11.17 10 12 10s1.5.67 1.5 1.5S12.83 13 12 13m4 0c-.83 0-1.5-.67-1.5-1.5S15.17 10 16 10s1.5.67 1.5 1.5S16.83 13 16 13"
      />
    </svg>
  )
);

ChatIcon.displayName = "ChatIcon";
