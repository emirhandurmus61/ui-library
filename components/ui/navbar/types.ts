export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavUser {
  name: string;
  email?: string;
  avatarSrc?: string;
}

export interface NavbarBaseProps {
  logo?: React.ReactNode;
  logoText?: string;
  links?: NavLink[];
  className?: string;
}

export interface NavCategory {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavCategory[];
}

export interface NavBreadcrumb {
  label: string;
  href?: string;
}

export interface NavDropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
  divider?: boolean;
}
