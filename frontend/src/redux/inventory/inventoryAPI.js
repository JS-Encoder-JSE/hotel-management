import baseAPI from "../baseAPI.js";

const inventoryAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    inventory: build.query({
      query: ({ cp, filter, search }) =>
        `item/get-items?page=${++cp}${filter ? `&stock=${filter}` : ""}${
          search ? `&name=${search}` : ""
        }`,
      providesTags: ["inventory"],
    }),
    addInventory: build.mutation({
      query: (data) => {
        return {
          url: "item/add-item",
          method: "post",
          body: data,
        };
      },
      invalidatesTags: ["inventory"],
    }),
    deleteInventory: build.mutation({
      query: (id) => {
        return {
          url: `item/delete-item/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["inventory"],
    }),
    updateInventory: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `item/update-item/${id}`,
          method: "patch",
          body: data,
        };
      },
      invalidatesTags: ["inventory"],
    }),
  }),
});

export const {
  useInventoryQuery,
  useAddInventoryMutation,
  useDeleteInventoryMutation,
  useUpdateInventoryMutation,
} = inventoryAPI;
