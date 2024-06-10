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
import ManagerProtectedPage from "./components/userLayout/ManagerProtected.jsx";
import StudentProtectedPage from "./components/userLayout/StudentProtected.jsx";

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
   
    {
      path: "/managementSubject",
      element: <SubjectManagementPage />,
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
      element: (
        <StudentProtectedPage>
          <ProfilePage />
        </StudentProtectedPage>
      ),
    },
    {
      path: "myBooking",
      element: (
        <StudentProtectedPage>
          <MyBookingPage />
        </StudentProtectedPage>
      ),
    },
    {
      path: "/manager",
      children: [
        {
          path: "subjectManagement",
          element: (
            <ManagerProtectedPage>
              <SubjectManagementPage />
            </ManagerProtectedPage>
          ),
        },
        {
          path: "classRoomManagement",
          element: (
            <ManagerProtectedPage>
              <ClassRoomManagementPage />
            </ManagerProtectedPage>
          ),
        },
        {
          path: "slotManagement",
          element: (
            <ManagerProtectedPage>
              <SlotManagementPage />
            </ManagerProtectedPage>
          ),
        },
        {
          path: "userManagement",
          element: (
            <ManagerProtectedPage>
              <UserManagementPage />
            </ManagerProtectedPage>
          ),
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
