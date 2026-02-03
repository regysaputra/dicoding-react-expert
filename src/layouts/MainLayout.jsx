import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {Outlet, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {asyncPreloadProcess} from "../states/isPreload/action.js";
import {asyncUnsetAuthUser} from "../states/authUser/action.js";

function MainLayout() {
    const navigate = useNavigate();
    const authUser = useSelector(state => state.authUser) ?? null;
    const isPreload = useSelector(state => state.isPreload) ?? false;
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(asyncPreloadProcess());
    }, [dispatch])

    function handleLogout() {
        dispatch(asyncUnsetAuthUser());
        navigate("/login");
    }

    if (isPreload) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header authUser={authUser} onLogout={handleLogout} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default MainLayout