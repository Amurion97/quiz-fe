import {Navigate, useRoutes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import SearchPage from "./pages/SearchPage";
import FlightPage from "./pages/FlightPage";
import BookingFinalization from "./pages/BookingFinalization";
import DashboardLayout from "./layouts/DashboardLayout";
import FlightCreationPage from "./pages/FlightCreationPage";
// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to="/dashboard/createFlight"/>, index: true},
                {path: 'createFlight', element: <FlightCreationPage/>},
                {path: 'search', element: <SearchPage/>},
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
            element: <FlightPage/>,
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
