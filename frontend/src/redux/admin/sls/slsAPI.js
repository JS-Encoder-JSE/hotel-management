import baseAPI from "../../baseAPI.js";

const slsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    addLicense: build.mutation({
      query: (data) => {
        return {
          url: "users/add-license",
          method: "post",
          body: data,
        };
      },
    }),
  }),
});

export const { useAddLicenseMutation } = slsAPI;
