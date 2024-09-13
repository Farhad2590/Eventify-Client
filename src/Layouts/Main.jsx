import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";

const Main = () => {
    return (
        <div className="font-lancelot mx-auto w-[94%]">
            <Navbar/>
            Hello From Main
            <Outlet></Outlet>
        </div>
    );
};

export default Main;