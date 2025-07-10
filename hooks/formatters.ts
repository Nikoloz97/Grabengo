export const dollarFormatter = (amount: number) => {
  return "$" + amount.toFixed(2).toString();
};

export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
