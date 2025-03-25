import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function logoutUser() {
  localStorage.removeItem("template");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/AIWebsiteBuilders/auth/login";
}

export function getUserId(token: string): number | null {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.id ? decoded.id : null;
  } catch (error) {
    return null;
  }
}

export const getFontSize = (size: string) => {
  const sizes = {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  };
  return sizes[size] || "1rem";
};
