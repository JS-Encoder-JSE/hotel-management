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
      invalidatesTags: ["owner"],
    }),
    renewLicense: build.mutation({
      query: (data) => {
        return {
          url: "users/renew-license",
          method: "patch",
          body: data,
        };
      },
      invalidatesTags: ["owner"],
    }),
    updateLicenseStatus: build.mutation({
      query: (data) => {
        return {
          url: "users/update-status",
          method: "patch",
          body: data,
        };
      },
      invalidatesTags: ["owner"],
    }),
  }),
});

export const {
  useAddLicenseMutation,
  useRenewLicenseMutation,
  useUpdateLicenseStatusMutation,
} = slsAPI;
