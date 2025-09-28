import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return "/default.png"; 
  return `http://10.10.7.62:5001/${imagePath}`;
};
