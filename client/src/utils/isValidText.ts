export const isValidText = (text: string) => {
  if (text.length < 3) return false;
  if (!text.trim().match(/^\w{1,64}(?:[, \t]+\w{1,64}){0,15}$/)) return false;
  return true;
};
