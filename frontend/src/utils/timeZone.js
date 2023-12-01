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
      originalDate.setMinutes(originalDate.getMinutes() - originalDate.getTimezoneOffset());
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
  