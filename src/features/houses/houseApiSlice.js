/* eslint-disable no-unused-vars */
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const housesAdapter = createEntityAdapter({});

const initialState = housesAdapter.getInitialState();

export const housesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHouses: builder.query({
      query: () => "/houses",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedHouses = responseData.map((house) => {
          house.id = house._id;
          return house;
        });
        return housesAdapter.setAll(initialState, loadedHouses);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "House", id: "LIST" },
            ...result.ids.map((id) => ({ type: "House", id })),
          ];
        } else return [{ type: "House", id: "LIST" }];
      },
    }),
    addNewHouse: builder.mutation({
      query: (initialHouse) => ({
        url: "/houses",
        method: "POST",
        body: {
          ...initialHouse,
        },
      }),
      invalidatesTags: [{ type: "House", id: "LIST" }],
    }),

    updateHouse: builder.mutation({
      query: (initialHouse) => ({
        url: "/houses",
        method: "PATCH",
        body: {
          ...initialHouse,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "House", id: arg.id }],
    }),
    deleteHouse: builder.mutation({
      query: ({ id }) => ({
        url: `/houses`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "House", id: arg.id }],
    }),
  }),
});

export const {
  useGetHousesQuery,
  useAddNewHouseMutation,
  useUpdateHouseMutation,
  useDeleteHouseMutation,
} = housesApiSlice;

// returns the query result object
export const selectHousesResult = housesApiSlice.endpoints.getHouses.select();

// creates memoized selector
const selectHousesData = createSelector(
  selectHousesResult,
  (housesResult) => housesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllHouses,
  selectById: selectHouseById,
  selectIds: selectHouseIds,
  // Pass in a selector that returns the houses slice of state
} = housesAdapter.getSelectors(
  (state) => selectHousesData(state) ?? initialState
);
