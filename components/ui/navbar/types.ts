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
