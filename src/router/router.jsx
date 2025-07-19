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
import MyProfile from "../Pages/Dashboard/MyProfile";
import Announcements from "../Pages/Dashboard/Announcements";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import ManageMembers from "../Pages/Dashboard/ManageMembers";

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
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    {
      path: "",
      element: <DashboardHome />,
    },
    {
      path: "my-profile",
      element: <MyProfile />,
    },
    {
      path: "announcements",
      element: <Announcements />,
    },
    {
      path: "payment-history",
      element: <PaymentHistory />,
    },
    {
      path: "make-payment",
      element: <MakePayment />,
    },
    {
      path: "my-agreement",
      element: <MyAgreement />,
    },
    {
      path: "post-announcement",
      element: <PostAnnouncement />,
    },
    {
      path: "manage-coupons",
      element: <ManageCoupon />,
    },
    {
      path: "all-agreements",
      element: <AllAgreements />,
    },
    {
      path: "manage-members",
      element: <ManageMembers />,
    },
    {
      path: "agreement-requests",
      // element: <AgreementRequests />,
    },
    {
      path: "admin-profile",
      // element: <AdminProfile />,
    },
  ],
}

]);
