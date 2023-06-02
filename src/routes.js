import {Navigate, useRoutes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardLayout from "./layouts/DashboardLayout";
import FlightCreationPage from "./pages/User/FlightCreationPage";
import UsersPage from "./pages/AdminPrivilege/UsersPage";
import SearchPage from "./pages/Booking/SearchPage";
import ResultsPage from "./pages/Booking/ResultsPage";
import BookingFinalization from "./pages/Booking/BookingFinalization";
import AircraftPage from "./pages/User/AircraftPage";

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to="/dashboard/createFlight"/>, index: true},
                {path: 'createFlight', element: <FlightCreationPage/>},
                {path: 'users', element: <UsersPage/>},
                {path: 'aircraft', element: <AircraftPage/>},
                {path: '404', element: <Page404/>},
                {path: '*', element: <Navigate to="/dashboard/404"/>},
            ],
        },
        {
            path: '/login',
            element: <LoginPage/>,
        },
        {
            path: "/search",
            element: <SearchPage/>,
        },
        {
            path: '/results',
            element: <ResultsPage/>,
        },
        {
            path: '/finalize',
            element: <BookingFinalization/>
        },
        {
            path: '/404',
            element: <Page404/>
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);

    return routes;
}
