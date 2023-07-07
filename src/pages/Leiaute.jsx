import { Outlet } from "react-router-dom";
import Sidebar from "../components/menu/Sidebar";
import './Leiaute.css';

const Leiaute = () => {
  return (
    <div className="leiaute">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Leiaute;
