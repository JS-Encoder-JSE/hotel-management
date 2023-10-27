import baseAPI from "../baseAPI.js";

const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (user) => {
        return {
          url: "signin",
          method: "post",
          body: user,
        };
      },
    }),
  }),
});

export const { useSignInMutation } = authAPI;
