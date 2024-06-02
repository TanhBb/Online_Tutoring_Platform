import { useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";
import swalService from "../../services/SwalService";

const ManagerProtected = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const isCenterManager = () => {
    return authService.getUserRole() === "CenterManager";
  };

  if (isAuthenticated() && (isCenterManager())) {
    return children;
  }

  swalService.showMessageToHandle(
    "Warning",
    "You are not authorized to access this page",
    "warning",
    () => navigate("/")
  );
};

export default ManagerProtected;
