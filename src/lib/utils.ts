import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return "/default.png";
  return `${process.env.NEXT_PUBLIC_BASEURL}/${imagePath}`;
};
