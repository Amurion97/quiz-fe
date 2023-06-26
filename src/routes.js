import {Navigate, useRoutes} from 'react-router-dom';

//layouts
import DashboardLayout from "./layouts/DashboardLayout";

// user flow
import LoginPage from './pages/Authentication/LoginPage';
import ForgotPasswordPage from './pages/Authentication/ResetRequestPage';
import ResetPasswordPage from './pages/Authentication/ResetPasswordPage';
import RegisterPage from "./pages/Authentication/RegisterPage";
import Page404 from './pages/Page404';

//admin flow
import UsersPage from "./pages/AdminPrivilege/UsersPage";

//teacher flow
import QuestionCreationPage from "./pages/Teacher/QuestionCreationPage";
import QuestionManagement from "./pages/Teacher/QuestionManagement";
import QuestionEditPage from "./pages/Teacher/QuestionEditPage";
import TagPage from "./pages/Teacher/TagPage";
import TestCreatePage from "./pages/Teacher/Test/TestCreate";
import TestStatisticPage from "./pages/Teacher/Test/TestStatisticPage";
import TestPage from "./pages/Teacher/Test/TestPage";
import SumStatisticPage from "./pages/Teacher/Test/SumStatisticPage";

//student flow
import StudentLayout from "./layouts/StudentLayout";
import TestTakingPage from "./pages/Student/TestTakingPage";
import TestResultPage from "./pages/Student/TestResultPage";
import QuizSearch from './pages/Student/QuizSearch';

// redux
import {useSelector} from 'react-redux';
import {selectUser} from "./features/user/userSlice";
import GroupWaitingRoom from "./pages/Student/GroupTest/GroupWaitingRoom";
import { TeacherStartOnlineTest } from "./pages/Teacher/Test/TeacherStartOnlineTest";
import Socket from "./pages/Socket/Socket";
import GroupTestTakingPage from "./pages/Student/GroupTest/GroupTestTakingPage";

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

                {path: 'testCreate',element: <TestCreatePage/>},
                {path: 'tests',element: <TestPage/>},
                {path: 'test-statistic', element: <TestStatisticPage/>},
                {path: 'sum-statistic', element: <SumStatisticPage/>},
                { path: 'test', element: <TeacherStartOnlineTest /> },

                {path: 'tag', element: <TagPage/>},

                {path: '404', element: <Page404/>},
                {path: '*', element: <Navigate to="/dashboard/404"/>},
            ] : [],
        },

        {
            path: '/students',
            element: user.info ? <StudentLayout/> : <Navigate to={'/login'}/>,
            children: [
                {element: <Navigate to="/students/quizSearch"/>, index: true},
                {path: 'quizSearch', element: <QuizSearch/>},
                {path: 'test', element: <TestTakingPage/>},
                {path: 'result', element: <TestResultPage/>},
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
            // element: <Navigate to="/login"/>,
            element: (user.info ? (user.info.role <= 2 ? <Navigate to="/dashboard"/> :
                <Navigate to="/students"/>) : <Navigate to="/login"/>),
        },
        {
            path: '/GroupWaitingRoom',
            element: <GroupWaitingRoom/>
        },
        {
            path: "/socket",
            element: <Socket/>,
        },

        {
            path: "/groupTestTaking",
            element: <GroupTestTakingPage/>,
        },

        {
            path: '*',
            element: <Navigate to="/404" replace/>,
        },
    ]);
}
