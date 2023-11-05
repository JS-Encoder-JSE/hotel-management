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
    getUser: build.query({
      query: (id) => `users/get-user-by-id/${id}`,
      providesTags: ["subadmin"],
    }),
    updateUser: build.mutation({
      query: (data) => {
        return {
          url: "users/update-field",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["subadmin"],
    }),
    getUsers: build.query({
      query: ({ cp, filter, search, role,parentId }) =>
        `users/get-users?page=${++cp}${filter ? `&filter=${filter}` : ""}${
          search ? `&search=${search}` : ""
        }${role ? `&role=${role}` : ""}&user_id=${parentId}`,
      providesTags: ["owner"],
    }),
  }),
});

export const {
  useAddSubAdminMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} = slsAPI;
