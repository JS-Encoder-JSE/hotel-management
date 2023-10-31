import baseAPI from "../baseAPI.js";

const roomAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    rooms: build.query({
      query: (page) => `rooms/get-room?page=${++page}`,
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
  useAddBookingMutation,
} = roomAPI;
