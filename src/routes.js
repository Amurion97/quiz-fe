import {Navigate, useRoutes} from 'react-router-dom';
// layouts
// import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
// import BlogPage from './pages/BlogPage';
// import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import SearchPage from "./pages/SearchPage";
import FlightPage from "./pages/FlightPage";
import BookingFinalization from "./pages/BookingFinalization";
import DashboardAppPage from "./pages/DashboardAppPage";
import DashboardLayout from "./layouts/DashboardLayout";
// import ProductsPage from './pages/ProductsPage';
// import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to="/dashboard/app"/>, index: true},
                {path: 'app', element: <DashboardAppPage/>},
                {path: 'createFlight', element: <FlightPage/>},
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
