import baseAPI from "../baseAPI.js";

const hotelsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    hotels: build.query({
      query: ({ cp, filter, search }) =>
        `rooms/get-room?page=${++cp}${filter ? `&status=${filter}` : ""}${
          search ? `&roomNumber=${search}` : ""
        }`,
      providesTags: ["room"],
    }),
    room: build.query({
      query: (id) => `rooms/get-room-by-id/${id}`,
      providesTags: ["room"],
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
    addBooking: build.mutation({
      query: (data) => {
        return {
          url: "booking/add-booking",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useRoomQuery,
  useRoomsQuery,
  useAddHotelMutation,
  useDeleteRoomMutation,
  useAddBookingMutation,
} = hotelsAPI;
