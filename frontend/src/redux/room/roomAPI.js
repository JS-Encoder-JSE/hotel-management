import baseAPI from "../baseAPI.js";

const roomAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    rooms: build.query({
      query: (page) => `rooms/get-room?page=${++page}`,
      invalidatesTags: ["room"]
    }),
    room: build.query({
      query: (id) => `rooms/get-room-by-id/${id}`,
    }),
    addRoom: build.mutation({
      query: (data) => {
        return {
          url: "rooms/add-room",
          method: "post",
          body: data,
        };
      },
      providesTags: ["room"]
    }),
    deleteRoom: build.mutation({
      query: (id) => {
        return {
          url: `rooms/delete-room/${id}`,
          method: "delete",
        };
      },
      providesTags: ["room"]
    }),
    addBooking: build.mutation({
      query: (data) => {
        return {
          url: "booking/add-booking",
          method: "post",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useRoomQuery,
  useRoomsQuery,
  useAddRoomMutation,
  useDeleteRoomMutation,
  useAddBookingMutation,
} = roomAPI;
