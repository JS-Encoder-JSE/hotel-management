import baseAPI from "../baseAPI.js";

const roomAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    roomNumbers: build.query({
      query: () => `rooms/get-room?only_for_room=true`,
      providesTags: ["room"],
    }),
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
    updateRoom: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `rooms/update-room/${id}`,
          method: "PATCH",
          body: data,
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
  useRoomNumbersQuery,
  useRoomQuery,
  useRoomsQuery,
  useAddRoomMutation,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
  useAddBookingMutation,
} = roomAPI;
