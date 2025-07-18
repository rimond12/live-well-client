import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";

import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ApartmentList from "../Pages/ApartmentList/ApartmentList";
import DashboardLayout from "../Layouts/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import MyAgreement from "../Pages/Dashboard/MyAgreement";
import MakePayment from "../Pages/Dashboard/MakePayment";
import AllAgreements from "../Pages/Dashboard/AllAgreements";
import PostAnnouncement from "../Pages/Dashboard/PostAnnouncement";
import ManageCoupon from "../Pages/Dashboard/ManageCoupon";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path:'apartments',
        element:<ApartmentList></ApartmentList>
      }
    ],
  },
  {
    path:"/dashboard",
    element:<DashboardLayout></DashboardLayout>,
    children:[
          {
        path: "",
        element: <DashboardHome />,
      },
      {
        path: "my-agreement",
        element: <MyAgreement />,
      },
      {
        path: "make-payment",
        element: <MakePayment />,
      },
      {
        path: "all-agreements",
        element: <AllAgreements />,
      },
      {
        path: "post-announcement",
        element: <PostAnnouncement />,
      },
      {
        path: "manage-coupons",
        element: <ManageCoupon />,
      },
    ]
  }
]);
