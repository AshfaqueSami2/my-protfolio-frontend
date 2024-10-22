import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API configuration
export const baseApi = createApi({
  reducerPath: "api", // Optional: You can change the reducer path if needed
  baseQuery: fetchBaseQuery({
    baseUrl: "https://my-protfolio-backend.vercel.app/api", // Replace this with your actual base URL
    prepareHeaders: (headers) => {
      // Attach the token from localStorage to the Authorization header if available
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Mutation for adding a project
    addProject: builder.mutation({
      query: (projectData) => ({
        url: "/projects",
        method: "POST",
        body: projectData,
      }),
    }),

    // Query for fetching all projects
    getAllProjects: builder.query({
      query: () => "/projects",
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`, // Fetch project by ID
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
    }),
    updateProject: builder.mutation({
      query: ({ id, projectData }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: projectData,
      }),
    }),
    // Mutation for adding education
    addEducation: builder.mutation({
      query: (educationData) => ({
        url: "/education",
        method: "POST",
        body: educationData,
      }),
    }),
    updateEducation: builder.mutation({
      query: ({ id, educationData }) => ({
        url: `/education/${id}`,
        method: "PUT",
        body: educationData,
      }),
    }),

    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education/${id}`,
        method: "DELETE",
      }),
    }),

    // Query for fetching all education entries
    getAllEducation: builder.query({
      query: () => "/education",
    }),

    addBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blogs",
        method: "POST",
        body: blogData,
      }),
    }),
    getAllBlogs: builder.query({
      query: () => "/blogs",
    }),
    getBlogById: builder.query({
      query: (id) => `/blogs/${id}`,
    }),
    updateBlog: builder.mutation({
      query: ({ id, blogData }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: blogData,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for use in components
export const {
  useAddProjectMutation, // Hook for adding a project
  useGetAllProjectsQuery, // Hook for fetching projects
  useAddEducationMutation, // Hook for adding education
  useGetAllEducationQuery, // Hook for fetching education
  useDeleteEducationMutation,
  useUpdateEducationMutation,
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = baseApi;
