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

export const getConvertedIsoStartDate = (inputDate) => {
  const date = new Date(inputDate);
  // Adjust for the local time zone
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);
  // Set time to midnight
  date.setHours(0, 0, 0, 0);

  // Convert to ISO string
  const isoString = date ? date.toISOString() : "";

  return isoString;
};

export const getConvertedIsoEndDate = (inputDate) => {
  console.log("endDate", inputDate);
  // Use the current date if inputDate is not provided
  const date = new Date(inputDate);

  // Adjust for the local time zone
  const offset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - offset);

  // Set time to the last millisecond of the day
  date.setHours(23, 59, 59, 999);

  // Convert to ISO string
  const isoString = date.toISOString();

  return isoString;
};
export const getTodayFormateDate = (date) => {
  return date
    ? new Date(date).toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
};
export const fromDateIsoConverterForAddExpenses = (date) => {
  const fromDate = new Date(date);
  fromDate.setHours(18, 0, 0, 0);
  const isoFromDate = fromDate?.toISOString();
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

export const checkinListFromDate = (date) => {
  const fromDate = new Date(date);
  fromDate.setHours(11, 30, 0, 0);
  const isoFromDate = fromDate.toISOString();
  return isoFromDate;
};

export const checkinListoDate = (date) => {
  const toDate = new Date(date);
  toDate.setDate(new Date(date).getDate() + 1);
  toDate.setHours(11, 29, 59, 59);

  const isoToDate = toDate.toISOString();
  return isoToDate;
};

export const toDateIsoConverter = (date) => {
  const toDate = new Date(date);
  toDate.setUTCHours(23, 59, 59, 999);
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
// const url = window.location.href;
export const isValidUrl = (pageName, pageUrl) => {
  if (pageUrl) {
    return pageUrl.includes(pageName);
  }
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
export const getDiscountAmount = (originalAmount, discountPercentage) => {
  return Math.ceil(
    originalAmount - originalAmount * (discountPercentage / 100)
  );
};
export const dummyData = [
  {
    month_name: "November",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2022",
  },
  {
    month_name: "December",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2022",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "January",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "February",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "March",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "April",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "May",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "June",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "July",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "August",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "September",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
  {
    month_name: "October",
    total_booking: 0,
    total_checkin: 0,
    total_checkout: 6,
    total_expired: 0,
    total_renew: 0,
    total_sale: 0,
    total_hotel_expenses: 0,
    total_hotel_income: 0,
    total_hotel_profit: 0,
    total_restaurant_expenses: 0,
    total_restaurant_income: 0,
    total_restaurant_profit: 0,
    updatedAt: "2023-11-18T15:46:21.952Z",
    user_id: "65586d2f9250d89c1bac2d5b",
    user_role: "manager",
    year: "2023",
    total_income: 0,
    total_profit: 0,
    total_expense: 0,
  },
];

// DHK Version controller
export const versionControl = "01.50.8";
