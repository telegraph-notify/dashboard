import { useLocation } from "react-router-dom";
import LogsSidebar from "./LogsSidebar.tsx";
import UsersSidebar from "./UsersSidebar.tsx";

function SelectedWindow() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/notification-logs" && <LogsSidebar />}
      {location.pathname === "/my-users" && <UsersSidebar />}
      {/* {location.pathname === "/" && <HomeComponent />} */}
    </>
  );
}

export default SelectedWindow;
