import baseAPI from "../baseAPI";

const dashboardApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getDashboardInfo: build.query({
      query: (id) => `dashboards/get-dashboard-info/${id}`,
    }),
  }),
});

export const { useGetDashboardInfoQuery } = dashboardApi;
