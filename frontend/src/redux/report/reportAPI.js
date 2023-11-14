import baseAPI from "./../baseAPI.js";

const reportAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getManagerReport: build.query({
      query: ({ id, cp, filter, search, uid, toDate, fromDate, limit }) =>
        `reports/get-rooms-reports-by-hotel/${id}?page=${++cp}${
          limit ? `&limit=${limit}` : ""
        }${filter ? `&filter=${filter}` : ""}${
          search ? `&search=${search}` : ""
        }${uid ? `&user_id=${uid}` : ""}&toDate=${toDate || ""}&fromDate=${
          fromDate || ""
        }`,
    }),
  }),
});

export const { useGetManagerReportQuery } = reportAPI;
