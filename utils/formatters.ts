export const dollarFormatter = (amount: number) => {
  return "$" + amount.toFixed(2).toString();
};

export const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const stringToDate = (mmDDYYYYStringDate: string) => {
  const [month, day, year] = mmDDYYYYStringDate.split("/").map(Number);
  return new Date(year, month - 1, day); // months are 0-based
};

export const formatPhoneNumber = (input: string) => {
  const digits = input.replace(/\D/g, ""); // remove all non-digits

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};
