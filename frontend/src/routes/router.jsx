import { createBrowserRouter } from "react-router-dom";
import Signup from "../components/SignUp";
import Login from "../components/Login";
import Layout from "../layouts/layout";
import DashboardLayout from "../layouts/DashboardLayout";
import NotesPage from "../pages/NotePage";
import FavoritePage from "../pages/FavoritePage";
import ImportantPage from "../pages/ImportantPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
    ],
  },

  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />, 
        children: [
          { index: true, element: <NotesPage /> }, 
          { path: "AllNotes", element: <NotesPage /> },
          { path: "favorites", element: <FavoritePage /> },
          { path: "important", element: <ImportantPage /> },
        ],
      },
    ],
  },
]);

export default router;
