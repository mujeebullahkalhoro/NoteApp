import { createBrowserRouter } from "react-router";
import Signup from "../components/SignUp";
import Layout from "../layouts/layout";
import Login from "../components/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<Signup/>


      }
    ]
   
  },

 
])

export default router