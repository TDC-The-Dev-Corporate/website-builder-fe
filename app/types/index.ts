export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  layout: TemplateLayout;
}

export interface TemplateLayout {
  sections: Section[];
  styles: Record<string, any>;
  navigation?: Navigation;
}

export interface Section {
  id: string;
  type: "hero" | "about" | "projects" | "contact";
  content: Record<string, any>;
  styles: Record<string, any>;
}

export interface Portfolio {
  id: string;
  userId: string;
  templateId: string;
  customizations: TemplateLayout;
  content: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  title: string;
  description: string;
  image: string;
}

export interface Navigation {
  type: "navbar" | "drawer";
  items: NavItem[];
  styles: Record<string, any>;
}

export interface NavItem {
  label: string;
  href: string;
}
