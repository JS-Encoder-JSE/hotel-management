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
		getTransactionlogs: build.query({
			query: ({ id, fromDate, toDate,cp }) =>
				`/transactions/get-transactionlogs?user_id=${id}&fromDate=${fromDate}&toDate=${toDate}&page=${++cp}`,
			providesTags: ["transaction_log"],
		}),
	}),
});

export const { useOwnerListQuery, useGetTransactionlogsQuery } = ownerListAPI;
