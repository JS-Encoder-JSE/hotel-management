import baseAPI from "../baseAPI.js";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (credentials) => {
        return {
          url: "users/login",
          method: "POST",
          body: credentials,
        };
      },
      invalidatesTags: ["auth"],
    }),
    user: build.query({
      query: () => "users/get-login-user",
      providesTags: ["auth"],
    }),
    
  }),
});

export const { useSignInMutation, useUserQuery } =
  authAPI;
