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
import FlightPage from "./pages/User/FlightPage";
import AirportPage from "./pages/User/AirportPage";
import BookingDetailsPage from "./pages/Booking/BookingDetailsPage";
import {useSelector} from 'react-redux';
import QuestionCreationPage from "./pages/Teacher/QuestionCreationPage";
import StudentLayout from "./layouts/StudentLayout";
import TagPage from "./pages/User/TagPage";
import ForgotPasswordPage from './pages/ResetRequestPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RegisterPage from "./pages/RegisterPage";
import QuestionSearchResults from "./pages/Teacher/QuestionSearchResults";
import QuestionManagement from "./pages/Teacher/QuestionManagement";
import QuestionEditPage from "./pages/Teacher/QuestionEditPage";

// ----------------------------------------------------------------------

export default function Router() {
    let user = useSelector(({user}) => {
        return user;
    });
    const routes = useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout/>,
            children: [
                {element: <Navigate to="/dashboard/questions"/>, index: true},
                {path: 'users', element: (user.info ? (user.info.role === 1 ? <UsersPage/> : <Page404/>) : <Page404/>)},

                {path: 'questions', element: <QuestionManagement/>},
                {path: 'createQuestion', element: <QuestionCreationPage/>},
                {path: 'editQuestion', element: <QuestionEditPage/>},

                {path: 'tag', element: <TagPage/>},

                {path: '404', element: <Page404/>},
                {path: '*', element: <Navigate to="/dashboard/404"/>},
            ],
        },
        {
            path: '/students',
            element: <StudentLayout/>,
            children: [
                {element: <Navigate to="/students/listData"/>, index: true},
                {path: 'listData', element: <QuestionSearchResults/>},
                {path: 'users', element: (user.info ? (user.info.role === 1 ? <UsersPage/> : <Page404/>) : <Page404/>)},
            ]
        },

        {
            path: '/login',
            element: <LoginPage/>,
        },
        {
            path: '/register',
            element: <RegisterPage/>,
        },

        {
            path: '/forgot-password',
            element: <ForgotPasswordPage/>,
        },
        {
            path: '/reset-password',
            element: <ResetPasswordPage/>,
        },

        {
            path: '/404',
            element: <Page404/>
        },
        {
            path: "/",
            element: <Navigate to="/login"/>,
        },


        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);

    return routes;
}
