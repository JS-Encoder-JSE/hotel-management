import baseAPI from "../baseAPI";

const dashboardApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getDashboardInfo: build.query({
      query:()=> "dashboards/get-dashboard-info",
    }),
  }),
});

export const { useGetDashboardInfoQuery } = dashboardApi;
