import baseAPI from "../baseAPI.js";

const roomAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    rooms: build.query({
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
    addRoom: build.mutation({
      query: (data) => {
        return {
          url: "rooms/add-room",
          method: "post",
          body: data,
        };
      },
      invalidatesTags: ["room"],
    }),
    deleteRoom: build.mutation({
      query: (id) => {
        return {
          url: `rooms/delete-room/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["room"],
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
