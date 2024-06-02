import { useRoutes } from "react-router-dom";
import "./App.css";
import HomePage from "./page/HomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import AboutPage from "./page/AboutPage.jsx";
import SubjectManagementPage from "./page/SubjectManagementPage.jsx";
import ClassRoomManagementPage from "./page/ClassRoomManagementPage.jsx";
import SlotManagementPage from "./page/SlotManagementPage.jsx";
import UserManagementPage from "./page/UserManagementPage.jsx";
import UserManagementADPage from "./page/UserManagementADPage.jsx";
import CenterManagementPage from "./page/CenterManagementPage.jsx";
import ProfilePage from "./page/ProfilePage.jsx";
import CheckBookingPage from "./page/CheckBookingPage.jsx";
import MyBookingPage from "./page/MyBookingPage.jsx";
import ScheduleTrackingPage from "./page/ScheduleTrackingPage.jsx";
import AdminProtectedPage from "./components/userLayout/AdminProtected.jsx";
import TeacherProtectedPage from "./components/userLayout/TeacherProtected.jsx";

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "myBooking",
      element: <MyBookingPage />,
    },
    {
      path: "/manager",
      children: [
        {
          path: "subjectManagement",
          element: <SubjectManagementPage />,
        },
        {
          path: "classRoomManagement",
          element: <ClassRoomManagementPage />,
        },
        {
          path: "slotManagement",
          element: <SlotManagementPage />,
        },
        {
          path: "userManagement",
          element: <UserManagementPage />,
        },
      ],
    },
    {
      path: "/admin",
      children: [
        {
          path: "centerManagement",
          element: (
            <AdminProtectedPage>
              <CenterManagementPage />
            </AdminProtectedPage>
          ),
        },
        {
          path: "userManagementAD",
          element: (
            <AdminProtectedPage>
              <UserManagementADPage />
            </AdminProtectedPage>
          ),
        },
      ],
    },
    {
      path: "/teacher",
      children: [
        {
          path: "checkBooking",
          element: (
            <TeacherProtectedPage>
              <CheckBookingPage />
            </TeacherProtectedPage>
          ),
        },
        {
          path: "ScheduleTracking",
          element: (
            <TeacherProtectedPage>
              <ScheduleTrackingPage />
            </TeacherProtectedPage>
          ),
        },
      ],
    },
  ]);

  return router;
}

export default App;
