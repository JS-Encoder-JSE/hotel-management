import baseAPI from "../../baseAPI.js";

const ownerListAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    ownerList: build.query({
      query: ({ cp, filter, search }) =>
        `users/get-owners-by-admin?page=${++cp}${
          filter ? `&filter=${filter}` : ""
        }${search ? `&search=${search}` : ""}`,
      providesTags: ["owner"],
    }),
  }),
});

export const { useOwnerListQuery } = ownerListAPI;
