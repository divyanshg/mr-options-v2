import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ISSERVER = typeof window === "undefined";

export function getFromLocalStorage(key: string, parse: boolean = true) {
  if (ISSERVER) return null;
  const value = window.localStorage.getItem(key);
  if (value) {
    return parse ? JSON.parse(value) : value;
  }
  return null;
}
export function setToLocalStorage(
  key: string,
  value: any,
  parse: boolean = true
) {
  if (ISSERVER) return null;
  const valueToStore = parse ? JSON.stringify(value) : value;
  window.localStorage.setItem(key, valueToStore);
}
export function removeFromLocalStorage(key: string) {
  if (ISSERVER) return null;
  window.localStorage.removeItem(key);
}
