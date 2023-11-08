import baseAPI from "../baseAPI.js";

const hotelsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    hotels: build.query({
      query: ({ cp, search, uid, pid }) =>
        `hotels/get-hotels?page=${++cp}${search ? `&search=${search}` : ""}${
          uid ? `&user_id=${uid}` : ""
        }${pid ? `&parent_id=${pid}` : ""}`,
      providesTags: ["hotels"],
    }),
    hotel: build.query({
      query: (id) => `hotels/get-hotel-by-id/${id}`,
      // providesTags: ["room"],
      providesTags: ["hotels"],
    }),
    addHotel: build.mutation({
      query: (data) => {
        return {
          url: "hotels/add-hotel",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["room"],
    }),
    deleteRoom: build.mutation({
      query: (id) => {
        return {
          url: `rooms/delete-room/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["room"],
    }),
    updateHotel: build.mutation({
      query: ({id, data }) => {
        return {
          url: `hotels/update-hotel/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["hotels"]
    }),
  }),
});

export const {
  useHotelQuery,
  useHotelsQuery,
  useAddHotelMutation,
  useDeleteRoomMutation,
  useUpdateHotelMutation,
} = hotelsAPI;
