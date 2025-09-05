export const removeInvisibleChars = (input: string): string => {
  return input.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '');
};
