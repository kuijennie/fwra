export type AppRole = "farmer" | "buyer" | "admin";

type NavItem = {
  href: string;
  labelKey: string;
};

const anonymousDesktopNav: NavItem[] = [
  { href: "/waste-input", labelKey: "nav.logWaste" },
  { href: "/recommendations", labelKey: "nav.recommendations" },
  { href: "/tutorials", labelKey: "nav.tutorials" },
  { href: "/marketplace", labelKey: "nav.marketplace" },
  { href: "/reports", labelKey: "nav.reports" },
];

const roleDesktopNav: Record<AppRole, NavItem[]> = {
  farmer: [
    { href: "/waste-input", labelKey: "nav.logWaste" },
    { href: "/recommendations", labelKey: "nav.recommendations" },
    { href: "/tutorials", labelKey: "nav.tutorials" },
    { href: "/farmer/sell", labelKey: "nav.sell" },
    { href: "/marketplace", labelKey: "nav.marketplace" },
    { href: "/reports", labelKey: "nav.reports" },
  ],
  buyer: [
    { href: "/marketplace", labelKey: "nav.marketplace" },
  ],
  admin: [
    { href: "/admin", labelKey: "roles.admin" },
    { href: "/marketplace", labelKey: "nav.marketplace" },
    { href: "/tutorials", labelKey: "nav.tutorials" },
  ],
};

const anonymousMobileNav: NavItem[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/waste-input", labelKey: "nav.logWaste" },
  { href: "/tutorials", labelKey: "nav.tutorials" },
  { href: "/marketplace", labelKey: "nav.marketplace" },
  { href: "/profile", labelKey: "nav.profile" },
];

const roleMobileNav: Record<AppRole, NavItem[]> = {
  farmer: [
    { href: "/waste-input", labelKey: "nav.logWaste" },
    { href: "/recommendations", labelKey: "nav.recommendations" },
    { href: "/tutorials", labelKey: "nav.tutorials" },
    { href: "/farmer/sell", labelKey: "nav.sell" },
    { href: "/profile", labelKey: "nav.profile" },
  ],
  buyer: [
    { href: "/marketplace", labelKey: "nav.marketplace" },
    { href: "/profile", labelKey: "nav.profile" },
  ],
  admin: [
    { href: "/", labelKey: "nav.home" },
    { href: "/admin", labelKey: "roles.admin" },
    { href: "/marketplace", labelKey: "nav.marketplace" },
    { href: "/tutorials", labelKey: "nav.tutorials" },
    { href: "/profile", labelKey: "nav.profile" },
  ],
};

export function isAppRole(value: string | null | undefined): value is AppRole {
  return value === "farmer" || value === "buyer" || value === "admin";
}

export function getDesktopNavItems(role: string | null | undefined): NavItem[] {
  return isAppRole(role) ? roleDesktopNav[role] : anonymousDesktopNav;
}

export function getMobileNavItems(role: string | null | undefined): NavItem[] {
  return isAppRole(role) ? roleMobileNav[role] : anonymousMobileNav;
}
