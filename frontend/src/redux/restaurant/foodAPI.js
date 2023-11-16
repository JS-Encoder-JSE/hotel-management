import baseAPI from "../baseAPI.js";

const foodAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    foods: build.query({
      query: ({ cp, pp, search }) =>
        `foods/get-foods-by-hotel?limit=${pp}&page=${++cp}${
          search ? `&search=${search}` : ""
        }`,
      providesTags: ["food"],
    }),
    food: build.query({
      query: (id) => `foods/get-food-by-id/${id}`,
      providesTags: ["food"],
    }),
    addFood: build.mutation({
      query: (data) => {
        return {
          url: "foods/add-food",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["food"],
    }),
    deleteFood: build.mutation({
      query: (id) => {
        return {
          url: `foods/delete-food/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["food"],
    }),
    updateFood: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `foods/update-food/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["food"],
    }),
    addOrder: build.mutation({
      query: (data) => {
        return {
          url: "foods/add-order",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["food", "order"],
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
    orders: build.query({
      query: ({ current_order, cp, pp, search }) =>
        `foods/get-orders-by-hotel?limit=${pp}&page=${++cp}${
          search ? `&search=${search}` : ""
        } ${current_order ? `&current_order=true` : ""}`,
      providesTags: ["order"],
    }),
    addTable: build.mutation({
      query: (data) => {
        return {
          url: "tables/add-table",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["food"],
    }),
    getOrderById: build.query({
      query: (id) => `foods/get-order-by-id/${id}`,
      providesTags: ["checkout"],
    }),
    updateOrder: build.mutation({
      query: ({ data, id }) => {
        return {
          url: `foods/update-order/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["checkout", "order"],
    }),
  }),
});

export const {
  useFoodQuery,
  useFoodsQuery,
  useAddFoodMutation,
  useAddOrderMutation,
  useDeleteFoodMutation,
  useUpdateFoodMutation,
  useOrdersQuery,
  useDeleteOrderMutation,
  useAddTableMutation,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} = foodAPI;
