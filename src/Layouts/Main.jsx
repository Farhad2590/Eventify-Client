import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {
    return (
        <div className="font-lancelot ">
            <Navbar/>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;