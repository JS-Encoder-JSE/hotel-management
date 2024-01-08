import baseAPI from "../../baseAPI.js";

const slsAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    addLicense: build.mutation({
      query: (data) => {
        return {
          url: "users/add-license",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["owner"],
    }),
    renewLicense: build.mutation({
      query: (data) => {
        return {
          url: "users/renew-license",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["owner","status_log"],
    }),
    updateLicenseStatus: build.mutation({
      query: (data) => {
        return {
          url: "users/update-status",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["owner", "status_log"],
    }),
  }),
});

export const {
  useAddLicenseMutation,
  useRenewLicenseMutation,
  useUpdateLicenseStatusMutation,
} = slsAPI;
