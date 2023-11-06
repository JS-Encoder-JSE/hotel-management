import baseAPI from "../../baseAPI.js";

const reportAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getReport: build.query({
      query: ({ cp, filter, search, uid ,toDate,fromDate}) =>
        `reports/get-report?page=${++cp}${
          filter ? `&filter=${filter}` : ""
        }${search ? `&search=${search}` : ""}${uid ? `&user_id=${uid}` : ""}&toDate=${toDate||''}&fromDate=${fromDate||''}`,
    }),
  }),
});

export const { useGetReportQuery } = reportAPI;
