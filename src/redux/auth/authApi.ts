import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginRequest {
  email: string; // Changed from 'username' to 'email'
  password: string;
}

export interface LoginResponse {
  [x: string]: any;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string; // Added role here
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://my-protfolio-backend.vercel.app/api/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
