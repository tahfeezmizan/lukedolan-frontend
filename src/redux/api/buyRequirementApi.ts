import { baseApi } from "./baseApi";

const buyRequirementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints...
    createBuyRequirement: builder.mutation({
      query: (requirementData) => {
        console.log("buyRequirements form api endpoint", requirementData);

        return {
          url: "/buyRequirements/create",
          method: "POST",
          body: requirementData,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useCreateBuyRequirementMutation } = buyRequirementApi;
