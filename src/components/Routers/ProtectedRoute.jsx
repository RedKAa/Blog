import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserInfo } from "../../utils/utils";

function ProtectedRoute ({
    acceptedRoles,
    children,
 })  {
  const authUser = getUserInfo();
  const role = authUser?.role;

  const location = useLocation();
   if (!authUser || !acceptedRoles.includes(role)) {
     return <Navigate to="/login" replace state={{ redirectTo: location }} />;
   }
   return children ? children : <Outlet />;
 };

 export default ProtectedRoute;