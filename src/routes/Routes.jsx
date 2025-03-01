import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layouts/Main";
import PrivateRoute from "../routes/PrivateRoute";
import ErrorPage from "../Pages/SharedPages/ErrorPage";
import Home from "../Pages/SharedPages/Home";
// import Gallerys from "../Pages/SharedPages/Gallerys";
import EventifyReels from "../Pages/SharedPages/EventifyReels";
import EventCards from "../Pages/SharedPages/EventCards";
import CustomizeEvent from "../Components/EventComponents/CustomizeEvent";
import Login from "../Pages/SharedPages/Login";
import Register from "../Pages/SharedPages/Register";
import Dashboard from "../Pages/dashboard/Dashboard";
import AdminAddEvent from "../Pages/AdminPages/AdminAddEvent";
import AdminManageEvents from "../Pages/AdminPages/AdminManageEvents";
import Demo from "../Shared/Demo";
import AdminManageUsers from "../Pages/AdminPages/AdminManageUsers";
import AdminAssignMod from "../Pages/AdminPages/AdminAssignMod";
import ModeratorManageEvents from "../Pages/ModeratorPages/ModeratorManageEvents";
import ModeartorEventstatus from "../Pages/ModeratorPages/ModeartorEventstatus";
import UserBookedEvents from "../Pages/UserPages/UserBookedEvents";
import ModeratorRequirements from "../Pages/ModeratorPages/ModeratorRequirements";
import AddReview from "../Pages/UserPages/UserAddReview";
import EditEvent from "../Pages/AdminPages/EditEvent";
import ViewReview from "../Pages/UserPages/UserViewReview";
import ModeratorStaffs from "../Pages/ModeratorPages/ModeratorStaffs";
import ProfileSettings from "../Shared/ProfileSettings";
import UserConfirmedEvents from "../Pages/UserPages/UserConfirmedEvents";
import UserSupportPage from "../Pages/UserPages/UserSupportPage";
import AddMedia from "../Pages/AdminPages/AddMedia";
import ManageMedia from "../Pages/AdminPages/ManageMedia";
import ModeratorPackageDetails from "../Pages/ModeratorPages/ModeratorPackageDetails";
import { Gallery } from "../Pages/SharedPages/Gallery";
import ModEventDetails from "../Pages/ModeratorPages/ModEventDetails";
import ModeratorFeedback from "../Pages/ModeratorPages/ModeratorFeedback";
import AdminBudgetSection from "../Pages/AdminPages/AdminBudgetSection";


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
                element: <PrivateRoute><Gallery /></PrivateRoute>,
            },
            {
                path: "/reels",
                element: <PrivateRoute><EventifyReels /></PrivateRoute>,
            },
            {
                path: '/event',
                element: <PrivateRoute><EventCards /></PrivateRoute>,
            },
            {
                path: '/event/:_id',
                element: <PrivateRoute><CustomizeEvent /></PrivateRoute>,
                loader: ({ params }) =>
                    fetch(`https://eventify-server-production.up.railway.app/event/${params._id}`),
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
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: '/dashboard/add-event',
                element: <PrivateRoute><AdminAddEvent /></PrivateRoute>,
            },
            {
                path: '/dashboard/manage-event',
                element: <PrivateRoute><AdminManageEvents /></PrivateRoute>,
            },
            {
                path: '/dashboard/add-media',
                element: <AddMedia></AddMedia>,
            },
            {
                path: '/dashboard/manage-users',
                element: <AdminManageUsers />
            },
            {
                path: '/dashboard/assign-mod',
                element: <AdminAssignMod />
            },
            {
                path: '/dashboard/edit-event/:_id',
                element: <EditEvent />,
                loader: ({ params }) => fetch(`https://eventify-server-production.up.railway.app/event/${params._id}`)
            },
            {
                path: '/dashboard/manage-media',
                element: <ManageMedia></ManageMedia>
            },
            {
                path: '/dashboard/business-reports',
                element: <AdminBudgetSection></AdminBudgetSection>,
            },
            {
                path: '/dashboard/admin-profile',
                element: <ProfileSettings></ProfileSettings>,
            },
            // moderator routes
            {
                path: '/dashboard/mod/user-profile',
                element: <ProfileSettings></ProfileSettings>,
            },
            {
                path: '/dashboard/mod/eventDetails/:_id',
                element: <ModEventDetails></ModEventDetails>,
                loader: ({ params }) => fetch(`https://eventify-server-production.up.railway.app/eventConfirmed/${params._id}`)
            },

            {
                path: '/dashboard/mod/manage-event',
                element: <ModeratorManageEvents></ModeratorManageEvents>,
            },
            {
                path: '/dashboard/mod/feedbacks',
                element: <ModeratorFeedback/>,
            },
            {
                path: '/dashboard/mod/add-report',
                element: <ModeratorStaffs></ModeratorStaffs>,
            },
            {
                path: '/dashboard/mod/add-requirements',
                element: <ModeratorRequirements></ModeratorRequirements>,
            },
            {
                path: '/dashboard/mod/event-status',
                element: <ModeartorEventstatus></ModeartorEventstatus>,
            },
            {
                path: '/dashboard/mod/manage-budget',
                element: <ModeratorPackageDetails></ModeratorPackageDetails>,
            },
            // users routes
            {
                path: '/dashboard/user/user-profile',
                element: <ProfileSettings></ProfileSettings>,
            },
            {
                path: '/dashboard/user/booked-events',
                element: <UserBookedEvents></UserBookedEvents>,
            },
            {
                path: '/dashboard/user/booked-confirms',
                element: <UserConfirmedEvents></UserConfirmedEvents>,
            },
            {
                path: '/dashboard/user/add-review',
                element: <AddReview></AddReview>,
            },
            {
                path: '/dashboard/user/reviews',
                element: <ViewReview />,
            },
            {
                path: '/dashboard/user/payment-history',
                element: <Demo></Demo>,
            },

            {
                path: '/dashboard/user/support',
                element: <UserSupportPage></UserSupportPage>,
            },

        ]
    }
]);