import { createBrowserRouter } from 'react-router-dom';
import Signup from '../components/SignUp';
import Login from '../components/Login';
import Layout from '../layouts/layout'; 
import DashboardLayout from '../layouts/DashboardLayout';


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
   
  },
]);

export default router;
