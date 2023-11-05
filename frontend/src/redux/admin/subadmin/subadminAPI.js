import baseAPI from "../../baseAPI.js";

const slsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    addSubAdmin: build.mutation({
      query: (data) => {
        return {
          url: "users/add-user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["subadmin"],
    }),
  }),
});

export const { useAddSubAdminMutation } = slsAPI;
