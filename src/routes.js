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
                {element: <Navigate to="/dashboard/app"/>, index: true},
                {path: 'createFlight', element: <FlightCreationPage/>},
                {path: 'search', element: <SearchPage/>},
                {path: '404', element: <Page404/>},
                {path: '*', element: <Navigate to="/dashboard/404"/>},
                // { path: 'user', element: <UserPage /> },
                // { path: 'products', element: <ProductsPage /> },
                // { path: 'blog', element: <BlogPage /> },
            ],
        },
        {
            path: "/search",
            element: <SearchPage/>,
            children: [
                {
                    path: 'login',
                    element: <LoginPage/>,
                },
            ]
        },
        {
            path: 'results',
            element: <FlightPage/>,
        },
        {
            path: 'finalize',
            element: <BookingFinalization/>
        },
        {
            path: '404',
            element: <Page404/>
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);

    return routes;
}
