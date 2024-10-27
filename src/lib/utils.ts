import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * utility function than performs a shallow equality comparison between two values
 * @param a
 * @param b
 * @returns
 */
export function shallowEqual(a: any, b: any) {
  if (a === b) {
    return true;
  }

  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }

  const keys = Object.keys(a);
  const { length } = keys;

  if (length !== Object.keys(b).length) {
    return false;
  }

  for (let i = 0; i < length; i += 1) {
    const key = keys[i];

    if (!(key in b)) {
      return false;
    }

    if (a[key] !== b[key]) {
      return false;
    }
  }

  return true;
}

export function formatDate(dateTime: string | null | undefined, format = 'MMMM DD YYYY, hh:MM a') {
  if (!dateTime) {
    return '';
  }
  return dayjs(dateTime).format(format);
}

export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));


export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'COP'
  }).format(amount);
};