export interface SidebarItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

export interface SidebarSection {
  label?: string;
  items: SidebarItem[];
}
