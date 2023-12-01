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
      invalidatesTags: ["room", "booking"],
    }),
    cancelBooking: build.mutation({
      query: (id) => {
        return {
          url: `bookings/cancel-booking/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["booking"],
    }),

    addExpenses: build.mutation({
      query: (data) => {
        return {
          url: "expenses/add-expense",
          method: "POST",
          body: data,
          invalidatesTags: ["GetExpenses"],
        };
      },
      invalidatesTags: ["addRestaurantExpenses"],
    }),
    getCheckout: build.mutation({
      query: (ids) => {
        return {
          url: "bookings/get-checkoutinfo-by-rooms",
          method: "POST",
          body: ids,
          // invalidatesTags: ["GetExpenses"],
        };
      },
      invalidatesTags: ["addRestaurantExpenses"],
    }),
    updateBookingInfo: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `bookings/update-booking-info/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["booking"],
    }),
    getExpenses: build.query({
      query: ({ cp, fromDate, toDate, hotel_id, spendedfor, limit, filter }) =>
        `expenses/get-expenses?page=${++cp}${limit ? `&limit=${limit}` : ""} ${filter ? `&filter=${filter}` : ""}
        ${
          fromDate ? `&fromDate=${fromDate}` : ""
        }${toDate ? `&toDate=${toDate}` : ""}${
          hotel_id ? `&hotel_id=${hotel_id}` : ""
        }${spendedfor ? `&spendedfor=${spendedfor}` : ""}`,
      providesTags: ["GetExpenses"],
    }),

    getOrdersByDate: build.query({
      query: ({ date, order_status, hotel_id }) =>
        `foods/get-orders-by-date?date=${date}&order_status=${order_status}&hotel_id=${hotel_id}`,
    }),
    // getDailyData:build.query({
    //   query: ({ managerId, fromDate, toDate }) =>
    //   `hotels/get-daily-datas?managerId=${managerId}&fromDate=${fromDate}&toDate=${toDate}`,}),
    //   providesTags
    // }),

    getDailyData:build.query({
      query:({managerId,fromDate,toDate})=>`hotels/get-daily-datas?managerId=${managerId}&fromDate=${fromDate}&toDate=${toDate}`,
      providesTags:["getDailyData"]
    }),

    getExpenseById: build.query({
      query: (id) => {
        return `expenses/get-expense-by-id/${id}`;
      },
      providesTags: ["restaurantExpenseById", "GetExpenses"],
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
        return `bookings/get-bookings-by-hotel?search=${search || ""}&page=${
          page + 1
        }${filter ? `&filter=${filter}` : ""}`;
      },
      providesTags: ["booking", "room"],
    }),
    getBookingById: build.query({
      query: (id) => {
        return `bookings/get-booking-by-id/${id}`;
      },
      providesTags: ["booking"],
    }),

    getBookingInfoById: build.query({
      query: (id) => {
        return `bookings/get-booking-details/${id}`;
      },
      providesTags: ["bookingInfo", "booking"],
    }),

    getRoomPostedBills: build.query({
      query: (roomId) => {
        return `rooms/get-room-posted-bills/${roomId}`;
      },
      providesTags: ["roomPostedBill"],
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

    updateBookingTOCheckIn: build.mutation({
      query: ({ id, updatedData }) => {
        return {
          url: `bookings/add-to-checkin/${id}`,
          method: "POST",
          body: updatedData,
        };
      },
      invalidatesTags: ["booking"],
    }),

    // update Expenses
    updateExpense: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `/expenses/update-expense/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["expenses"],
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
    getItems: build.query({
      query: () => "items/get-items-by-hotel",
    }),
    getHotelByManagerId: build.query({
      query: (id) => `hotels/get-hotel-by-manager/${id}`,
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
  useUpdateExpenseMutation,
  useAddRoomMutation,
  useGetBookingsByHotelQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
  useAddBookingMutation,
  useGetBookingByIdQuery,
  useGetOrdersByDateQuery,
  useGetBookingInfoByIdQuery,
  useGetRoomPostedBillsQuery,
  useGetCOInfoQuery,
  useGetDailyDataQuery,
  useAddCheckoutMutation,
  useGetTablesQuery,
  useGetItemsQuery,
  useGetHotelByManagerIdQuery,
  useAddExpensesMutation,
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useCancelBookingMutation,
  useGetCheckoutMutation,
  useUpdateBookingInfoMutation,
  useUpdateBookingTOCheckInMutation,
} = roomAPI;
