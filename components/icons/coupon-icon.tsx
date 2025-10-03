import * as React from "react";

export const CouponIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      data-ds-icon="Coupon"
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
        d="M17 9c0-.55.45-1 1-1h2V3c0-1.1-.9-2-2-2h-2c0 2.21-1.79 4-4 4S8 3.21 8 1H6c-1.1 0-2 .9-2 2v5h2c.55 0 1 .45 1 1s-.45 1-1 1H4v11c0 1.1.9 2 2 2h2c0-2.21 1.79-4 4-4s4 1.79 4 4h2c1.1 0 2-.9 2-2V10h-2c-.55 0-1-.45-1-1m-3 1h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1"
      />
    </svg>
  )
);

CouponIcon.displayName = "CouponIcon";
