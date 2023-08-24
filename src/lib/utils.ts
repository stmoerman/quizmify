import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeDelta(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const secs = Math.floor(seconds - hours * 3600 - minutes * 60);
  const timeData = [];
  if (hours > 0) {
    timeData.push(`${hours}h`);
  }
  if (minutes > 0) {
    timeData.push(`${minutes}m`);
  }
  if (secs > 0) {
    timeData.push(`${secs}s`);
  }
  return timeData.join(" ");
}
