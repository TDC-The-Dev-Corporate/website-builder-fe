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
