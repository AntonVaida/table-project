export const generateRandomThreeDigitNumber = (): number => {
  return Math.floor(Math.random() * 899) + 100;
};