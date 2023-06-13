import {Navigate, useRoutes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
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
import PhonePage from "./pages/Test/PhonePage";
import AddPhoneForm from "./pages/Test/AddPhoneForm";
import EditPhoneForm from "./pages/Test/EditPhoneForm";
import Detail from "./pages/Test/Detail";
import { useSelector } from 'react-redux';
import QuestionCreationPage from "./pages/Teacher/QuestionCreationPage";
import ChangePasswordForm from "./components/Forms/ChangePasswordForm";


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
                {element: <Navigate to="/dashboard/createFlight"/>, index: true},
                {path: 'createFlight', element: <FlightCreationPage/>},
                {path: 'users', element: (user.info? (user.info.role === 1 ? <UsersPage/>: <Page404/>):<Page404/>)},
                {path: 'aircraft', element: <AircraftPage/>},
                {path: 'flights', element: <FlightPage/>},
                {path: 'airports', element: <AirportPage/>},
                {path: 'createQuestion', element: <QuestionCreationPage/>},
                {path: '404', element: <Page404/>},
                {path: '*', element: <Navigate to="/dashboard/404"/>},
            ],
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
            path: "/search",
            element: <SearchPage/>,
        },
        {
            path: "/booking",
            element: <BookingDetailsPage/>,
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
            path: "/",
            element: <SearchPage/>,
        },
        {
            path: 'test',
            element: <PhonePage/>,
        },
        {
            path: 'test/add',
            element: <AddPhoneForm/>,
        },
        {
            path: 'test/edit',
            element: <EditPhoneForm/>,
        },
        {
            path: 'test/detail',
            element: <Detail/>,
        },
        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);

    return routes;
}
