export const getFormateDateAndTime = (date) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
  });
  return formattedDate;
};

export const getISOStringDate = (date) => {
  if (date) {
    const originalDate = new Date(date);

    const formattedDate = originalDate.toISOString();
    return formattedDate;
  } else {
    return "";
  }
};

export const fromDateIsoConverter = (date) => {
  const fromDate = new Date(date);
  fromDate.setHours(0, 0, 0, 0);
  const isoFromDate = fromDate.toISOString();
  return isoFromDate;
};
export const toDateIsoConverter = (date) => {
  const toDate = new Date(date);
  toDate.setHours(23, 59, 59, 999);
  const isoToDate = toDate.toISOString();
  return isoToDate;
};
