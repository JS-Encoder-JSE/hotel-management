import baseAPI from "./../baseAPI.js";

const reportAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getManagerReport: build.query({
      query: ({ cp, filter, search, toDate, fromDate, limit }) =>
        `reports/get-rooms-reports-by-hotel?page=${++cp}${
          limit ? `&limit=${limit}` : ""
        }${filter ? `&filter=${filter}` : ""}${
          search ? `&search=${search}` : ""
        }&toDate=${toDate || ""}&fromDate=${fromDate || ""}`,
    }),
  }),
});

export const { useGetManagerReportQuery } = reportAPI;
