import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (imagePath: unknown): string => {
  if (!imagePath) return "/default.png";

  // Ensure the value is a string
  if (typeof imagePath !== "string") {
    console.warn("⚠️ getImageUrl expected a string but received:", imagePath);
    return "/default.png";
  }

  // If it's already an absolute URL
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // Otherwise, prepend the base URL
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

export function getToken(): string | null {
  try {
    // 1️⃣ Try direct key first
    const directToken = localStorage.getItem("accessToken");
    if (directToken) return directToken;

    // 2️⃣ Otherwise, try Redux persisted store
    const persistedData = localStorage.getItem("persist:root");
    if (persistedData) {
      const parsedRoot = JSON.parse(persistedData);
      const userData = JSON.parse(parsedRoot.user || "{}");
      return userData.accessToken || null;
    }

    return null;
  } catch (error) {
    console.error("Failed to read token from localStorage:", error);
    return null;
  }
}


export function formatWorkDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  // Month names
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format dates
  const startStr = `${monthNames[start.getMonth()]} ${start.getFullYear()}`;
  const endStr = endDate ? `${monthNames[end.getMonth()]} ${end.getFullYear()}` : "present";

  // Calculate total months difference
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  // Convert to years and months
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Build duration string
  let duration = "";
  if (years > 0) duration += `${years} yr${years > 1 ? "s" : ""}`;
  if (months > 0) duration += `${years > 0 ? " " : ""}${months} mo${months > 1 ? "s" : ""}`;
  if (!duration) duration = "Less than a month";

  return `${duration}`;
}
