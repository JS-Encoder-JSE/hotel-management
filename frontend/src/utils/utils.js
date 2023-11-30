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

export const fromDateIsoConverterForAddExpenses = (date) => {
  const fromDate = new Date(date);
  fromDate.setHours(18, 0, 0, 0);
  const isoFromDate = fromDate.toISOString();
  return isoFromDate;
};

// export const fromDateIsoConverterForAddExpenses = (date) => {
//   const fromDate = new Date(date);
//   fromDate.setHours(12, 0, 0, 0); // Set hours to 12
//   const isoFromDate = fromDate.toISOString();
//   return isoFromDate;
// };

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

export const getformatDateTime = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formattedDateTime = new Date(date || new Date()).toLocaleString(
    "en-US",
    options
  );
  return formattedDateTime;
};

export const getNumberOfDays = (fromDate, toDate) => {
  const calculateDays =
    Math.abs(new Date(toDate) - new Date(fromDate)) / (24 * 60 * 60 * 1000);

  return Math.ceil(calculateDays);
};

export function getCurrentDateWithDay() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];

  const formattedDate = `${currentDate.toDateString()}`;

  return formattedDate;
}
