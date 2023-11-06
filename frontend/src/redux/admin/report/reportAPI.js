import baseAPI from "../../baseAPI.js";

const reportAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getReport: build.query({
      query: ({ cp, filter, search, uid }) =>
        `users/get-owners-by-admin?page=${++cp}${
          filter ? `&filter=${filter}` : ""
        }${search ? `&search=${search}` : ""}${uid ? `&user_id=${uid}` : ""}`,
    }),
  }),
});

export const { useGetReportQuery } = reportAPI;
