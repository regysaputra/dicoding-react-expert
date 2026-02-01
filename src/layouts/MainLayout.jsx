import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {Outlet} from "react-router";

function MainLayout() {


    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout