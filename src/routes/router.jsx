import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Home from "../Pages/Home/Home/Home";
import CollectionArea from "../Pages/CollectionArea/CollectionArea";
import PrivateRouter from "./PrivateRouter";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";
import DonationRequest from "../Pages/Home/DonationRequest/DonationRequest";
import Users from "../Pages/Dashboard/Users/Users";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch('/CollectonArea.json').then(res => res.json())
            },
            {
                path: "collection-area",
                Component: CollectionArea,
                loader: () => fetch('/CollectonArea.json').then(res => res.json())
            },
            {
                path: "donation-request",
                element:<PrivateRouter><DonationRequest></DonationRequest></PrivateRouter>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        children: [
            {
                path: 'my-donation-requests',
                Component:MyDonationRequests
            },
            {
                path: 'users',
                Component:Users
            }
        ]
    }
]);