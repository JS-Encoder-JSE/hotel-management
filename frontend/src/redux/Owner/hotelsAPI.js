import baseAPI from "../baseAPI.js";

const hotelsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    hotels: build.query({
      query: ({ cp, search, uid, pid, filter }) =>
        `hotels/get-hotels?page=${++cp}${search ? `&search=${search}` : ""}${
          uid ? `&user_id=${uid}` : ""
        }${pid ? `&parent_id=${pid}` : ""}${filter ? `&filter=${filter}` : ""}`,
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
    getHotels: build.query({
      query: ({ id, cp, filter, search }) =>
        `hotels/get-hotel-by-manager/${id}?page=${++cp}${
          filter ? `&filter=${filter}` : ""
        }${search ? `&search=${search}` : ""}`,
      providesTags: ["room"],
    }),
    updateHotel: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `hotels/update-hotel/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["hotels"],
    }),
  }),
});

export const {
  useHotelQuery,
  useHotelsQuery,
  useGetHotelsQuery,
  useAddHotelMutation,
  useDeleteRoomMutation,
  useUpdateHotelMutation,
} = hotelsAPI;
