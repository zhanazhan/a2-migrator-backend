import { removeInvisibleChars } from '@/libs/strings/remove-invisible-chars';
import { removeZeroWidthChars } from '@/libs/strings/remove-zero-width-chars';

type Cleaner = (input: string) => string;

export const cleanText = (
  text: string,
  extraCleaners: Cleaner[] = [],
): string => {
  const cleaners: Cleaner[] = [
    removeZeroWidthChars,
    removeInvisibleChars,
    ...extraCleaners,
  ];
  return cleaners.reduce((acc, fn) => fn(acc), text);
};
