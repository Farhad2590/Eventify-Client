import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Gallerys from "../Pages/Gallerys";
import EventifyReels from "../Pages/EventifyReels";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import EventCards from "../Pages/EventCards";
import CustomizeEvent from "../Components/EventComponents/CustomizeEvent";
import Dashboard from "../Pages/AdminPages/dashboard/Dashboard";
import AddEvent from "../Pages/AdminPages/AddEvent";
import Cart from "../Pages/Cart";
import ManageEvents from "../Pages/AdminPages/ManageEvents";
import Demo from "../Shared/Demo";
import Eventstatus from "../Pages/ModeratorPages/Eventstatus";
import Faq from "../Pages/ModeratorPages/Faq";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/gallery",
                element: <PrivateRoute><Gallerys /></PrivateRoute>,
            },
            {
                path: "/reels",
                element:  <PrivateRoute><EventifyReels /></PrivateRoute>, 
            },
            {
                path: '/event',
                element: <PrivateRoute><EventCards /></PrivateRoute>,
            },
            {
                path: '/events/:_id',
                element: <PrivateRoute><CustomizeEvent /></PrivateRoute>,
                loader: ({ params }) =>
                    fetch(`http://localhost:5000/events/${params._id}`),
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ],
        
    },
    {   
        path:'/dashboard',
        element: <Dashboard></Dashboard> ,
        children:[
            {
                path: '/dashboard/add-event',
                element: <PrivateRoute><AddEvent /></PrivateRoute>,
            },
            {
                path: '/dashboard/manage-event',
                element: <PrivateRoute><ManageEvents /></PrivateRoute>,
            },
            {
                path: '/dashboard/add-media',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/manage-users',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/manage-media',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/business-reports',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/admin-profile',
                element: <Demo></Demo>,
            },
            // moderator routes
            {
                path: '/dashboard/mod/user-profile',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/mod/manage-event',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/mod/add-report',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/mod/add-requirements',
                element: <Demo></Demo> ,
            },
            {
                path: '/dashboard/mod/event-status',
                element: <Eventstatus></Eventstatus>,
            },
            {
                path: '/dashboard/mod/feedbacks',
                element: <Faq></Faq>,
            },
            {
                path: '/dashboard/mod/manage-budget',
                element: <Demo></Demo>,
            },
            // users routes
            {
                path: '/dashboard/user/user-profile',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/user/booked-events',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/user/add-review',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/user/reviews',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/user/payment-history',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/user/event-suggestions',
                element: <Demo></Demo>,
            },
            {
                path: '/dashboard/user/support',
                element: <Demo></Demo>,
            },

        ]
    }
]);