import * as React from "react";

export const MoreIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
    (props, ref) => (
        <svg
            ref={ref}
            data-ds-icon="More"
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
                d="M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0m7 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0M8 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0"
            />
        </svg>
    )
);

MoreIcon.displayName = "MoreIcon";
