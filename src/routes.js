import {Navigate, useRoutes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardLayout from "./layouts/DashboardLayout";
import UsersPage from "./pages/AdminPrivilege/UsersPage";
import QuestionCreationPage from "./pages/Teacher/QuestionCreationPage";
import StudentLayout from "./layouts/StudentLayout";
import ForgotPasswordPage from './pages/ResetRequestPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RegisterPage from "./pages/RegisterPage";
import QuestionSearchResults from "./pages/Teacher/QuestionSearchResults";
import QuestionManagement from "./pages/Teacher/QuestionManagement";
import QuestionEditPage from "./pages/Teacher/QuestionEditPage";
import TagPage from "./pages/Teacher/TagPage";
// redux
import {useSelector} from 'react-redux';
import {selectUser} from "./features/user/userSlice";
// ----------------------------------------------------------------------

export default function Router() {
    let user = useSelector(selectUser);
    return useRoutes([
        {
            path: '/dashboard',
            element: user.info ? <DashboardLayout/> : <Navigate to={'/login'}/>,
            children: user.info ? [
                {element: <Navigate to="/dashboard/questions"/>, index: true},
                {path: 'users', element: (user.info ? (user.info.role === 1 ? <UsersPage/> : <Page404/>) : <Page404/>)},

                {path: 'questions', element: <QuestionManagement/>},
                {path: 'createQuestion', element: <QuestionCreationPage/>},
                {path: 'editQuestion', element: <QuestionEditPage/>},

                {path: 'tag', element: <TagPage/>},

                {path: '404', element: <Page404/>},
                {path: '*', element: <Navigate to="/dashboard/404"/>},
            ] : [],
        },

        // {
        //     path: '/students',
        //     element: <StudentLayout/>,
        //     children: [
        //         {element: <Navigate to="/students/listData"/>, index: true},
        //         {path: 'listData', element: <QuestionSearchResults/>},
        //     ]
        // },

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
            // element: <Navigate to="/login"/>,
            element: (user.info ? (user.info.role <= 2 ? <Navigate to="/dashboard"/> :
                <Navigate to="/dashboard"/>) : <Navigate to="/login"/>),
        },


        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);
}
