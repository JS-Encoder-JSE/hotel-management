import baseAPI from "../baseAPI.js";

const foodAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    foods: build.query({
      query: ({ cp, pp, search }) =>
        `foods/get-food?limit=${pp}&page=${++cp}${
          search ? `&food_name=${search}` : ""
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
          method: "post",
          body: data,
        };
      },
      invalidatesTags: ["food"],
    }),
    deleteFood: build.mutation({
      query: (id) => {
        return {
          url: `foods/delete-food/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["food"],
    }),
  }),
});

export const {
  useFoodQuery,
  useFoodsQuery,
  useAddFoodMutation,
  useDeleteFoodMutation,
} = foodAPI;
