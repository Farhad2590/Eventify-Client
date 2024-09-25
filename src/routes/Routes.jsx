import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Gallerys from "../Pages/Gallerys";
import EventifyReels from "../Pages/EventifyReels";
import AddEvent from "../Pages/AdminPages/AddEvent"
import Login from "../Components/HomeComponents/Login";
import Register from "../Components/HomeComponents/Register";
import PrivateRoute from "./PrivateRoute";

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
                path: '/add-event',
                element: <PrivateRoute><AddEvent /></PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
]);