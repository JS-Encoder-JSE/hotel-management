import baseAPI from "../baseAPI.js";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (credentials) => {
        return {
          url: "user/login",
          method: "post",
          body: credentials,
        };
      },
    }),
  }),
});

export const { useSignInMutation } = authAPI;
