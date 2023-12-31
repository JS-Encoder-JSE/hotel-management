import baseAPI from "../baseAPI.js";
import store from "../../redux/store.js";

const roomAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    roomNumbers: build.query({
      query: () => `rooms/get-room?only_for_room=true`,
      providesTags: ["room"],
    }),
    rooms: build.query({
      query: ({ cp, filter, search, limit }) =>
        `rooms/get-rooms-by-hotel/?page=${++cp}${
          limit ? `&limit=${limit}` : ""
        }${filter ? `&filter=${filter}` : ""}${
          search ? `&search=${search}` : ""
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
          url: "bookings/add-booking",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["room",'booking'],
    }),
    getRoomsAndHotels: build.query({
      query: () => {
        const { user } = store.getState().authSlice;
        return `hotels/get-hotel-by-manager/${user?._id}`;
      },
      providesTags: ["room"],
    }),
    getBookingsByHotel: build.query({
      query: ({ hotel_id, page, limit, filter, search }) => {
        return `bookings/get-bookings-by-hotel?search=${
          search || ""
        }&page=${page + 1}${filter ? `&filter=${filter}` : ""}`;
      },
      providesTags: ["booking", "room"],
    }),
    getBookingById: build.query({
      query: (id) => {
        return `bookings/get-booking-by-id/${id}`;
      },
      providesTags: ["booking"],
    }),
    getHotelById: build.query({
      query: (id) => {
        return `hotels/get-hotel-by-id/${id}`;
      },
      providesTags: ["room"],
    }),
    updateBooking: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `bookings/update-booking/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["booking"],
    }),
    getCOInfo: build.query({
      query: (id) => `bookings/get-checkoutinfo-by-room/${id}`,
      // providesTags: ["room"],
    }),
    addCheckout: build.mutation({
      query: (data) => {
        return {
          url: "bookings/checkout",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["room"],
    }),
    getTables: build.query({
      query: () => `tables/get-tables-by-hotel`,
      providesTags: ["room"],
    }),
    getItems:build.query({
      query:()=>'items/get-items-by-hotel'
    }),
    getHotelByManagerId:build.query({
      query:(id)=>`hotels/get-hotel-by-manager/${id}`
    }),
  }),
});

export const {
  useGetHotelByIdQuery,
  useRoomNumbersQuery,
  useRoomQuery,
  useGetRoomsAndHotelsQuery,
  useRoomsQuery,
  useUpdateBookingMutation,
  useAddRoomMutation,
  useGetBookingsByHotelQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
  useAddBookingMutation,
  useGetBookingByIdQuery,
  useGetCOInfoQuery,
  useAddCheckoutMutation,
  useGetTablesQuery,
  useGetItemsQuery,
  useGetHotelByManagerIdQuery,
} = roomAPI;
