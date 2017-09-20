// @flow
export function getMonthName(monthNumber: number, format: string = "long") {
  const longNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const shortNames = [
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
    "Dec"
  ];
  if (format === "short") {
    return shortNames[monthNumber - 1];
  }
  return longNames[monthNumber - 1];
}
