import * as React from "react";

export const BlogIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      data-ds-icon="Blog"
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
        d="M21.17 5.632c.742 0 1.332.613 1.332 1.377v12.378c0 1.008-.799 1.83-1.783 1.83s-1.783-.822-1.783-1.83V5.632z"
      />
      <path
        fill="currentColor"
        d="M17.882 19.33V3.293C17.882 2.03 16.794 1 15.566 1H3.721C2.494 1 1.498 2.03 1.498 3.293V19.33c0 2.026 1.598 3.67 3.566 3.67h17.369c-1.969 0-4.54-1.644-4.54-3.67zM3.987 5.631h3.381v3.473h-3.38zm10.34 12.736H5.134a1.15 1.15 0 0 1-1.147-1.157c0-.637.51-1.158 1.147-1.158h9.193c.637 0 1.147.52 1.147 1.157s-.51 1.158-1.147 1.158m0-4.631H5.134a1.15 1.15 0 0 1-1.147-1.158c0-.637.51-1.158 1.147-1.158h9.193c.637 0 1.147.521 1.147 1.158s-.51 1.158-1.147 1.158m.012-5.79h-3.416A1.15 1.15 0 0 1 9.788 6.79c0-.636.51-1.157 1.135-1.157h3.416a1.15 1.15 0 0 1 1.135 1.157 1.15 1.15 0 0 1-1.135 1.158"
      />
    </svg>
  )
);

BlogIcon.displayName = "BlogIcon";
