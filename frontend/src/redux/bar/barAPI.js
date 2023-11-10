import baseAPI from "../baseAPI.js";

const barAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    addBar: build.mutation({
      query: (data) => {
        return {
          url: "bar/add-bar-order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["bar"],
    }),
    addOrder: build.mutation({
      query: (data) => {
        return {
          url: "foods/add-order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["food"],
    }),
    deleteOrder: build.mutation({
      query: (id) => {
        return {
          url: `/foods/delete-order/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["order"],
    }),
    ordersBar: build.query({
      query: ({ id, cp, pp, search }) =>
        `bar/get-bar-orders-by-hotel/${id}?limit=${pp}&page=${++cp}${
          search ? `&search=${search}` : ""
        }`,
      providesTags: ["order"],
    }),
  }),
});

export const {
  useFoodQuery,
  useFoodsQuery,
  useAddBarMutation,
  useAddOrderMutation,
  useDeleteFoodMutation,
  useUpdateFoodMutation,
  useOrdersBarQuery,
  useDeleteOrderMutation,
} = barAPI;
