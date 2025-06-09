import { createBrowserRouter } from 'react-router-dom';
import Signup from '../components/SignUp';
import Login from '../components/Login';
import Layout from '../layouts/layout'; 
import DashboardLayout from '../layouts/DashboardLayout';
import NotesPage from '../pages/NotePage';
import FavoritePage from '../pages/FavoritePage';   // create this component
import ImportantPage from '../pages/ImportantPage';   // create this component

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
    ],
  },

  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'AllNotes',
        element: <NotesPage />,
      },
      {
        path: 'favorites',
        element: <FavoritePage />,
      },
      {
        path: 'important',
        element: <ImportantPage />,
      },
    ],
  },
]);

export default router;
