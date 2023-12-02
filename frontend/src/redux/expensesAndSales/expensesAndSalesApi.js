import baseAPI from "../baseAPI";

const expensesAndSalesApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    updateExpensesItem: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `expenses/update-expense/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["GetExpenses","expenses"],
    }),
    getSubDashBoardInfo: builder.query({
      query: (managerId) => `subdashboards/get-subdashboard-info/${managerId}`,
    }),
  }),
});

export const { useUpdateExpensesItemMutation, useGetSubDashBoardInfoQuery } =
  expensesAndSalesApi;
