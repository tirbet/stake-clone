import { SVGProps } from "react";

export type IconType = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export interface NavItem {
    name: string;
    icon: IconType;
    url: string;
    onClick?: boolean;
    isExternal?: boolean;
    items?: NavItem[];
}
