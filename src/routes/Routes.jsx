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
        ]
    }
]);