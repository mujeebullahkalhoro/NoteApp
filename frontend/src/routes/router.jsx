import { createBrowserRouter } from "react-router";

import Layout from "../layouts/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
   
  },
 
])

export default router