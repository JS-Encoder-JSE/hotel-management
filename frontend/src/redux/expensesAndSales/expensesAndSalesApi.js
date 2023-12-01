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
      invalidatesTags: ["GetExpenses"],
    }),
  }),
});

export const { useUpdateExpensesItemMutation } = expensesAndSalesApi;
