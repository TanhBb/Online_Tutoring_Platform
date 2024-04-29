import { useRoutes } from "react-router-dom";
import "./App.css";
import HomePage from "./page/HomePage.jsx";
import LoginPage from "./page/LoginPage.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import AboutPage from "./page/AboutPage.jsx";
import EditProfilePage from "./page/EditProfile.jsx";
import SubjectPage from "./page/SubjectPage.jsx";
import ManageSubjectPage from "./page/ManageSubjectPage.jsx";
import SubjectManagementPage from "./page/SubjectManagementPage.jsx";
import TrackingPage from "./page//TrackingPage.jsx";
import UserManagement from "./page/UserManagement.jsx";
import ClassManagement from "./page/ClassManagement.jsx";
import BookingManagement from "./page//BookingManagementPage.jsx";

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
      path: "/editProfile",
      element: <EditProfilePage />,
    },
  ]);

  return router;
}

export default App;
