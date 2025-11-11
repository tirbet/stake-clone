import * as React from "react";

export const StaffIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      data-ds-icon="Staff"
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
        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14ZM16 10.5V9H14.5V10.5H13V12H14.5V13.5H16V12H17.5V10.5H16Z"
      />
      <path
        fill="currentColor"
        d="M18 2H22V4H20V6H18V4H16V2H18Z"
      />
    </svg>
  )
);

StaffIcon.displayName = "StaffIcon";