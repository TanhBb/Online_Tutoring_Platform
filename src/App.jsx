import { useRoutes } from "react-router-dom";
import "./App.css";
import HomePage from "./page/HomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import AboutPage from "./page/AboutPage.jsx";
<<<<<<< HEAD
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
=======
import EditProfilePage from "./page/EditProfile.jsx";
import SubjectPage from "./page/SubjectPage.jsx";
import ManageSubjectPage from "./page/ManageSubjectPage.jsx";
import SubjectManagementPage from "./page/SubjectManagementPage.jsx";
import TrackingPage from "./page//TrackingPage.jsx";
import UserManagement from "./page/UserManagement.jsx";
import ClassManagement from "./page/ClassManagement.jsx";
import BookingManagement from "./page//BookingManagementPage.jsx";
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/subject",
      element: <SubjectPage />,
    },
    {
      path: "/manageBooking",
      element: <BookingManagement />,
    },
    {
      path: "/manageAttendce",
      element: <TrackingPage />,
    },
    {
      path: "/manageSubject",
      element: <ManageSubjectPage />,
    },
    {
      path: "/managementSubject",
      element: <SubjectManagementPage />,
    },
    {
      path: "/managementClass",
      element: <ClassManagement />,
    },{
      path: "/managementUser",
      element: <UserManagement />,
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
<<<<<<< HEAD
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
=======
      path: "/editProfile",
      element: <EditProfilePage />,
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
    },
  ]);

  return router;
}

export default App;
