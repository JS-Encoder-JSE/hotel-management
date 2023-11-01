import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signOut } from "./auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://hotel-managment-backend.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authSlice.token;

    if (token) headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let response = await baseQuery(args, api, extraOptions);

  if (response.error && [401, 403].includes(response.error.originalStatus)) {
    api.dispatch(signOut());
  }

  return response;
};

const baseAPI = createApi({
  reducerPath: "baseAPI",
  tagTypes: ["auth", "room"],
  baseQuery: baseQueryWithReAuth,
  endpoints: (build) => ({
    upload: build.mutation({
      query: (data) => {
        return {
          url: "upload",
          method: "post",
          body: data,
        };
      },
    }),
  }),
});

export const { useUploadMutation } = baseAPI;
export default baseAPI;
