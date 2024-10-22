import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/pages/Home";
import AdminLogin from "../components/pages/AdminLogin";

import NotFound from "../components/pages/NotFound"; // Assuming you have a 404 NotFound page
import PrivateRoute from "../components/pages/PrivateRoute";
import AdminDashbaord from "../components/pages/AdminDashbaord";
import AdminSetEducation from "../components/Admin/AdminSetEducation";
import AdminViewEducation from "../components/Admin/AdminViewEducation";
import AdminProjectManagement from "../components/Admin/AdminAddProject";
import AdminViewProject from "../components/Admin/AdminViewProject";
import ShowProjectDetails from "../components/pages/ShowProjectDetails";
import AdminAddBlog from "../components/Admin/AdminAddBlog";
import AdminGetAllBlog from "../components/Admin/AdminGetAllBlog";
import BlogDetails from "../components/pages/BlogDetails";
import Blogs from "../components/pages/Blogs";
import AdminUpdateEducation from "../components/Admin/AdminUpdateEducation";
import AdminEditProject from "../components/Admin/AdminEditProject";
import AdminUpdateBlog from "../components/Admin/AdminUpdateBlog";

const router = createBrowserRouter([
  {
    path: "/", // Main path
    element: <App />, // The main layout component
    children: [
      {
        path: "/", // Home route
        element: <Home />,
      },
      {
        path: "/adminLogin", // Admin login route
        element: <AdminLogin />,
      },
      {
        path: "/projects/:id", // Admin login route
        element: <ShowProjectDetails></ShowProjectDetails>,
      },
      {
        path: "/blogs/:id", // Admin login route
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "/blogs", // Admin login route
        element: <Blogs></Blogs>,
      },
      {
        path: "/adminDashboard", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminDashbaord></AdminDashbaord>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/setEducation", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminSetEducation></AdminSetEducation>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/seeEducation", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminViewEducation></AdminViewEducation>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/addProject", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminProjectManagement></AdminProjectManagement>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/viewProject", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminViewProject></AdminViewProject>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/addBlog", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminAddBlog></AdminAddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/adminUpdateEducation/:id", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminUpdateEducation></AdminUpdateEducation>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/getAllBlog", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminGetAllBlog></AdminGetAllBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/adminEditProject/:id", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminEditProject></AdminEditProject>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard/adminUpdateBlog/:id", // Admin dashboard protected by PrivateRoute
        element: (
          <PrivateRoute>
            <AdminUpdateBlog></AdminUpdateBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "*", // Catch-all route for 404 not found
        element: <NotFound />, // You should create this NotFound component
      },
    ],
  },
]);

export default router;
