import * as React from "react";

export const AffiliateIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      data-ds-icon="Affiliate"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block shrink-0"
      {...props}
    >
      <path fill="currentColor" d="M12 11a5 5 0 1 0 0-10 5 5 0 0 0 0 10" />
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16.5 21v-.14l-.91-.65c-.5.19-1.04.29-1.59.29-2.48 0-4.5-2.02-4.5-4.5 0-1.16.45-2.2 1.17-3H9c-4.42 0-8 3.58-8 8 0 1.1.9 2 2 2h13.99c-.3-.61-.49-1.28-.49-2"
        clipRule="evenodd"
      />
      <path
        fill="currentColor"
        d="M21 18c-.64 0-1.23.2-1.72.54l-2.41-1.72c.08-.26.13-.53.13-.82s-.05-.56-.13-.82l2.41-1.72c.49.34 1.08.54 1.72.54 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .29.05.56.13.82l-2.41 1.72C15.23 13.2 14.64 13 14 13c-1.66 0-3 1.34-3 3s1.34 3 3 3c.64 0 1.23-.2 1.72-.54l2.41 1.72c-.08.26-.13.53-.13.82 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3"
      />
    </svg>
  )
);

AffiliateIcon.displayName = "AffiliateIcon";
