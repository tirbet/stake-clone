// /lib/admin/navigation.ts
import type { User } from "@/types/auth";
import { SystemRole } from "@/lib/constants/roles";
import { admin } from "@/lib/auth-client";

// Shape of navigation config
type RawNavItem = {
  name: string;
  url: string;
  icon: string;
  permission: string;
  requiredAction: string;
  items?: RawNavItem[];
};

type SimpleNavItem = {
  name: string;
  url: string;
  icon: string;
  items?: SimpleNavItem[];
};

// ---- MAIN FUNCTION ----
export const adminNavigations = (user: User | undefined): SimpleNavItem[] => {
  if (!user?.role) return [];

  // SUPER ADMIN → sees everything, no filtering
  if (user.role === SystemRole.RISK_ANALYST) {
    return allNavigations.map(stripNavItem);
  }

  const role = user.role as SystemRole;

  const filteredNavs = allNavigations
    .map((nav) => {
      // shallow copy to avoid mutating original config
      const navCopy: RawNavItem = {
        ...nav,
        items: nav.items ? [...nav.items] : undefined,
      };

      const hasTopPermission = hasPermissionForNav(
        role,
        navCopy.permission,
        navCopy.requiredAction,
      );

      // Filter sub-items (if any)
      if (navCopy.items) {
        navCopy.items = navCopy.items.filter((item) =>
          hasPermissionForNav(role, item.permission, item.requiredAction),
        );
      }

      // Keep this nav if:
      // - user has permission for top-level item, OR
      // - at least one child item is allowed
      if (hasTopPermission || (navCopy.items && navCopy.items.length > 0)) {
        return navCopy;
      }

      return null;
    })
    .filter((n): n is RawNavItem => n !== null);

  return filteredNavs.map(stripNavItem);
};

// ---- Permission helper using Better Auth Admin plugin ----
const hasPermissionForNav = (
  role: SystemRole,
  permission: string,
  requiredAction: string,
): boolean => {
  // This uses `ac` + `roles` that you passed into adminClient
  // permission -> resource key, requiredAction -> action
  return admin.checkRolePermission({
    role,
    permissions: {
      [permission]: [requiredAction],
    },
  });
};

// Strip config-only fields before returning to UI
const stripNavItem = (item: RawNavItem): SimpleNavItem => ({
  name: item.name,
  icon: item.icon,
  url: item.url,
  items: item.items?.map((sub) => ({
    name: sub.name,
    icon: sub.icon,
    url: sub.url,
  })),
});

// ---- ALL NAV CONFIG ----
const allNavigations: RawNavItem[] = [
  {
    name: "navigation.admin.dashboard",
    url: "/dashboard",
    icon: "dashboard",
    permission: "dashboard", // <- must match a resource in your `statement`
    requiredAction: "READ",  // <- must match an action in that resource
  },
  {
    name: "navigation.admin.configuration",
    url: "/dashboard/configuration",
    icon: "settings",
    permission: "configuration",
    requiredAction: "READ",
    items: [
      {
        name: "navigation.admin.sportsbook",
        url: "/dashboard/configuration/sportsbook?tab=sports",
        icon: "sports",
        permission: "sportsbook",
        requiredAction: "READ",
      },
      {
        name: "navigation.admin.bet_settlement",
        url: "/dashboard/configuration/bet_settlement",
        icon: "money",
        permission: "bet_settlement",
        requiredAction: "READ",
      },
      {
        name: "navigation.admin.smtp",
        url: "/dashboard/configuration/smtp",
        icon: "smtp",
        permission: "smtp",
        requiredAction: "READ",
      },
      {
        name: "navigation.admin.payment_provider",
        url: "/dashboard/configuration/payment_provider",
        icon: "payment",
        permission: "payment_provider",
        requiredAction: "READ",
      },
      {
        name: "navigation.admin.kyc",
        url: "/dashboard/configuration/kyc",
        icon: "security",
        permission: "kyc",
        requiredAction: "READ",
      },
      {
        name: "navigation.admin.currency",
        url: "/dashboard/configuration/currency",
        icon: "currency",
        permission: "currency",
        requiredAction: "READ",
      },
    ],
  },
];
