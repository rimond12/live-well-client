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
import AgreementRequests from "../Pages/Dashboard/AgreementRequests";
import PrivateRoute from "../routes/PrivateRoute";
import AdminRoute from "../routes/AdminRoute";
import MemberRoute from "../routes/MemberRoute";
import AdminProfile from "../Pages/Dashboard/AdminProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import ForbiddenPage from "../Pages/Forbidden/ForbiddenPage";
import Loading from "../Pages/Loading/Loading";
import AboutPage from "../Pages/AboutPage/AboutPage";
import ContactUs from "../Pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    hydrateFallbackElement: <Loading></Loading>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "apartments",
        element: <ApartmentList></ApartmentList>,
      },
      {
        path: "about",
        element: <AboutPage></AboutPage>,
      },
      {
        path:"contact",
        element: <ContactUs></ContactUs>
      },
      {
        path: "forbidden",
        Component: ForbiddenPage,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
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
        element: (
          <MemberRoute>
            <PaymentHistory />
          </MemberRoute>
        ),
      },
      {
        path: "make-payment",
        element: (
          <MemberRoute>
            <MakePayment />
          </MemberRoute>
        ),
      },
      {
        path: "my-agreement",
        element: (
          <MemberRoute>
            <MyAgreement />
          </MemberRoute>
        ),
      },
      {
        path: "post-announcement",
        element: (
          <AdminRoute>
            <PostAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <AdminRoute>
            <ManageCoupon />
          </AdminRoute>
        ),
      },
      {
        path: "all-agreements",
        element: (
          <AdminRoute>
            <AllAgreements />
          </AdminRoute>
        ),
      },
      {
        path: "manage-members",
        element: (
          <AdminRoute>
            <ManageMembers />
          </AdminRoute>
        ),
      },
      {
        path: "agreement-requests",
        element: (
          <AdminRoute>
            <AgreementRequests />
          </AdminRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            {" "}
            <AdminProfile />
          </AdminRoute>
        ),
      },
    ],
  },
]);
