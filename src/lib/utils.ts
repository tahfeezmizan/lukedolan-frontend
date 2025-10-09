import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return "/default.png";

  // If it's already an absolute URL (http/https), just return it as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Otherwise, prepend your base URL
  return `${process.env.NEXT_PUBLIC_BASEURL}/${imagePath}`;
};

export function getAuthData() {
  if (typeof window === "undefined") return null; // make sure it only runs client-side

  const persistRoot = localStorage.getItem("persist:root");

  if (!persistRoot) return null;

  try {
    const parsedRoot = JSON.parse(persistRoot);
    const userData = JSON.parse(parsedRoot.user);

    return {
      token: userData.user?.accessToken || null,
      role: userData.user?.role || null,
    };
  } catch (error) {
    console.error("Error parsing auth data", error);
    return null;
  }
}
