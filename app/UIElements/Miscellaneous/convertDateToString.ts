export const convertDateToString = (date: Date) => {
  const DateArray = String(date).split("T")[0].split("-");
  const day = DateArray[2],
    month = Number(DateArray[1]),
    year = DateArray[0],
    monthArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  return `${day} ${monthArray[month - 1]} ${year}`;
};
