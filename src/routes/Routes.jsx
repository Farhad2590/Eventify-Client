import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Gallerys from "../Pages/Gallerys";
import EventifyReels from "../Pages/EventifyReels";
import AddEvent from "../Pages/AdminPages/AddEvent"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/gallery",
                element: <Gallerys/>,
            },
            {
                path: "/reels",
                element: <EventifyReels/>,
            },
            {
                path:'/add-event',
                element: <AddEvent></AddEvent>
            }
        ]
    },
]);