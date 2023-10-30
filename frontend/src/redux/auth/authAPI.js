import baseAPI from "../baseAPI.js";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (credentials) => {
        return {
          url: "users/login",
          method: "post",
          body: credentials,
        };
      },
    }),
    user: build.query({
      query: () => "users/get-login-user",
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useSignInMutation, useUserQuery } = authAPI;
