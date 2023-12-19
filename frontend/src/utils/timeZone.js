import { addDays, isBefore, set } from "date-fns";

export const getFormateDateAndTime = (date) => {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Dhaka", // Set the timezone to Bangladesh
  });
  return formattedDate;
};

export const getISOStringDate = (date) => {
  if (date) {
    const originalDate = new Date(date);
    originalDate.setMinutes(
      originalDate.getMinutes() - originalDate.getTimezoneOffset()
    );
    const formattedDate = originalDate.toISOString();
    return formattedDate;
  } else {
    return "";
  }
};

// ... (other functions with timezone adjustments)

export const getformatDateTime = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka", // Set the timezone to Bangladesh
  };

  const formattedDateTime = new Date(date || new Date()).toLocaleString(
    "en-US",
    options
  );
  return formattedDateTime;
};

// ... (other functions with timezone adjustments)

export const convertedFromDate = (date) => {
  const fromDate = new Date(date);
  fromDate.setHours(18, 0, 0, 0);
  const isoFromDate = fromDate.toISOString();
  // Check if the selected time is before 11:59 am
  if (
    isBefore(
      date,
      set(date, { hours: 10, minutes: 0, seconds: 0, milliseconds: 0 })
    )
  ) {
    // If before 6 am, set check-in date to the previous day at 12:00 pm
    const previousDay = addDays(date, -1);
    previousDay.setHours(18, 0, 0, 0);
    const updatedFromDate = previousDay.toISOString();
    return updatedFromDate;
  } else {
    // Otherwise, set check-in date to the selected date at 12:00 pm
    return isoFromDate;
  }
};
export const convertedToDate = (date) => {
  const newDate = new Date(date);
  newDate.setHours(17, 59, 0, 0);
  const isoToDate = newDate.toISOString();
  return isoToDate;
};
export const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return `${hours}:${minutes}`;
};

export const getConvertedLocalDate = (date) => {
  const convertedDate = date ? new Date(date) : new Date();
  const offset = convertedDate.getTimezoneOffset();
  convertedDate.setMinutes(convertedDate.getMinutes() - offset);
  return convertedDate;
};
