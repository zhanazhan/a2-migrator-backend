export const removeZeroWidthChars = (input: string): string => {
  return input.replace(/[\u200B-\u200D\uFEFF]/g, '');
};
