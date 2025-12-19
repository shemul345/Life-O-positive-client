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
import AdminRoute from "./AdminRoute";
import AllBloodDonationRequests from "../Pages/Dashboard/AllBloodDonationRequests/AllBloodDonationRequests";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import Profile from "../Pages/Dashboard/Profile/Profile";
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement";
import AddBlog from "../Pages/Dashboard/Blogs/AddBlog/AddBlog";
import BlogDetails from "../Pages/Dashboard/Blogs/BlogDetails/BlogDetails";
import DonationRequests from "../Pages/Home/DonationRequests/DonationRequests";
import DonationRequestDetails from "../Pages/Home/DonationRequests/DonationRequestDetails";
import ContentPage from "../Pages/ContentPage/ContentPage";
import NotFound from "../Pages/NotFound/NotFound";
import AboutUs from "../Pages/AboutUs/AboutUs";
import FundingPage from "../Pages/Funding/FundingPage";
import FundingSuccess from "../Pages/Funding/FundingSuccess";
import FundingCancelled from "../Pages/Funding/FundingCancelled";
import SearchPage from "../Pages/Home/SearchPage/SearchPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "blog/:id",
                element: <BlogDetails />,
            },
            {
                path: "donation-requests", 
                element: <DonationRequests />
            },
            {
                path: 'donation-requests/:id',
                element: <DonationRequestDetails />
            },
            {
                path: "collection-area",
                Component: CollectionArea,
                loader: () => fetch('/CollectonArea.json').then(res => res.json())
            },
            {
                path: "donation-request",
                element:<PrivateRouter><DonationRequest></DonationRequest></PrivateRouter>
            },
            {
                path: 'search-donor',
                Component:SearchPage
            },
            {
                path: 'blogs',
                Component:ContentPage
            },
            {
                path: 'about-us',
                Component: AboutUs
            },
            {
                path: 'funding',
                element:<PrivateRouter><FundingPage></FundingPage></PrivateRouter>
            },
            {
                path: 'funding-success',
                Component:FundingSuccess
            },
            {
                path: 'funding-cancelled',
                Component:FundingCancelled
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
                index: true,
                Component:DashboardHome
            },
            {
                path: 'profile',
                Component: Profile
            },
            {
                path: 'my-donation-requests',
                Component:MyDonationRequests
            },
            {
                path: 'users',
                element:<AdminRoute><Users></Users></AdminRoute>
            },
            {
                path: 'all-blood-donation-requests',
                Component:AllBloodDonationRequests
            },
            {
                path: 'content-management',
                Component:ContentManagement
            },
            {
                path: 'content-management/add-blog',
                Component:AddBlog
            }
            
        ]
    },
    {
        path: '*',
        Component:NotFound
    }
]);