interface Template {
  id: string;
  name: string;
  thumbnail: string;
  layout: TemplateLayout;
}

interface TemplateLayout {
  sections: Section[];
  styles: Record<string, any>;
  navigation?: Navigation;
}

interface Section {
  id: string;
  type: "hero" | "about" | "projects" | "contact";
  content: Record<string, any>;
  styles: Record<string, any>;
}

interface Portfolio {
  id: string;
  userId: string;
  templateId: string;
  layout: TemplateLayout;
  content: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

interface Project {
  title: string;
  description: string;
  image: string;
}

interface Navigation {
  type: "navbar" | "drawer";
  items: NavItem[];
  styles: Record<string, any>;
}

interface NavItem {
  label: string;
  href: string;
}

interface ForgotPassword {
  EMAIL: string;
  pasword: string;
  confirmPassword: string;
}

interface UploadedAsset {
  id: string;
  src: string;
  name: string;
  mimeType: string;
  size: number;
  isImage: boolean;
  type: string;
}
