import { PermissionResource } from "@/schemas/permission.schema";
import { SVGProps } from "react";

export type IconType = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export interface NavItem {
    name: string;
    resource?: PermissionResource;
    icon: IconType;
    url: string;
    onClick?: boolean;
    isExternal?: boolean;
    items?: NavItem[];
}
