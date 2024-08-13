export const convertToAbbreviation = (number: number) => {
  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumSignificantDigits: 3,
  });

  return formatter.format(number);
};
