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
      invalidatesTags: ["bookingToCheckIn"],
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
      providesTags: ["addBooking"],
      invalidatesTags: ["room", "booking"],
    }),
    cancelBooking: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `bookings/cancel-booking/${id}`,
          method: "POST",
          body: data,
        };
      },
      providesTags: ["cancelBooking"],
      invalidatesTags: ["booking", "addBooking"],
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
      invalidatesTags: ["addRestaurantExpenses", "GetExpenses"],
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
        `expenses/get-expenses?${cp !== undefined ? `page=${cp + 1}` : ""}${
          limit ? `&limit=${limit}` : ""
        }${filter ? `&filter=${filter}` : ""}${
          fromDate ? `&fromDate=${fromDate}` : ""
        }${toDate ? `&toDate=${toDate}` : ""}${
          hotel_id ? `&hotel_id=${hotel_id}` : ""
        }${spendedfor ? `&spendedfor=${spendedfor}` : ""}`,
      providesTags: ["GetExpenses"],
    }),

    getOrdersByDate: build.query({
      query: ({ date, order_status, hotel_id }) =>
        `foods/get-orders-by-date?${
          date ? `date=${date}` : ""
        }&order_status=${order_status}&hotel_id=${hotel_id}`,
    }),
    // getDailyData:build.query({
    //   query: ({ managerId, fromDate, toDate }) =>
    //   `hotels/get-daily-datas?managerId=${managerId}&fromDate=${fromDate}&toDate=${toDate}`,}),
    //   providesTags
    // }),

    getDailyData: build.query({
      query: ({ cp, limit, filter, managerId, fromDate, toDate }) =>
        `hotels/get-daily-datas?${cp ? `page=${++cp}` : ""}${
          limit ? `&limit=${limit}` : ""
        }${
          filter ? `&filter=${filter}` : ""
        }&manager_id=${managerId}&fromDate=${fromDate}&toDate=${toDate}`,
      providesTags: ["getDailyData"],
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
      query: ({
        hotel_id,
        manager_id,
        page,
        limit,
        filter,
        search,
        fromDate,
        toDate,
        arrayFilter,
      }) => {
        return `bookings/get-bookings-by-hotel?search=${search || ""}&page=${
          page + 1
        }${filter ? `&filter=${filter}` : ""}${
          fromDate ? `&fromDate=${fromDate}` : ""
        }${toDate ? `&toDate=${toDate}` : ""}${
          arrayFilter ? `&arrayFilter=${arrayFilter}` : ""
        }${manager_id ? `&manager_id=${manager_id}` : ""}`;
      },
      providesTags: ["booking", "room"],
    }),
    getTodayCheckout: build.query({
      query: () => {
        return `bookings/get-bookings-by-hotel?&page=1&filter=CheckedOut&fromDate=2023-12-08T05:30:00.000Z&toDate=2023-12-09T05:29:59.999Z`;
      },
      providesTags: ["CheckedOut"],
    }),
    getBookingById: build.query({
      query: (id) => {
        return `bookings/get-booking-by-id/${id}`;
      },
      providesTags: ["booking"],
    }),
    getLastActiveBooking: build.query({
      query: (bookingId) => {
        return `bookings/last-active-booking-validator/${bookingId}`;
      },
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
      invalidatesTags: ["booking", "room"],
    }),

    updateBookingTOCheckIn: build.mutation({
      query: (updatedData) => {
        return {
          url: `bookings/add-to-checkin`,
          method: "POST",
          body: updatedData,
        };
      },
      providesTags: ["bookingToCheckIn"],
      invalidatesTags: ["booking"],
    }),
    makePayment: build.mutation({
      query: (data) => {
        return {
          url: `balances/make-payment`,
          method: "POST",
          body: data,
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
      invalidatesTags: ["room", "bookingToCheckIn"],
    }),
    cashback: build.mutation({
      query: (data) => {
        return {
          url: "balances/cashback",
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
  useGetLastActiveBookingQuery,
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
  useMakePaymentMutation,
  useCashbackMutation,
  useGetTodayCheckoutQuery,
} = roomAPI;
