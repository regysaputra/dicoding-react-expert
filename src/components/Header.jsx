import React from 'react';
import {Link, useLocation, useNavigate} from "react-router";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const menuRef = React.useRef(null);

    function handleAvatarClick() {
        setOpen(!open);
    }

    function handleLogout() {
        navigate("/login");
    }

    // close menu when clicking outside
    React.useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    React.useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10" data-id="element-119">
            <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between" data-id="element-120">
                <Link to="/" className="flex items-center space-x-2 group" data-id="element-121">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors" data-id="element-122">
                        <span className="font-bold text-lg" data-id="element-123">D</span>
                    </div>
                    <span className="font-bold text-slate-900 text-lg tracking-tight" data-id="element-124">DevForum</span>
                </Link>
                <div className="hidden md:flex items-center space-x-1" data-id="element-125">
                    <Link to="/" className="relative px-4 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-colors text-slate-500 hover:text-slate-900 hover:bg-slate-50" data-id="element-126">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-message-square w-4 h-4" aria-hidden="true" data-id="element-127">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span data-id="element-128">Discussions</span>
                    </Link>
                    <Link to="/leaderboard" className="relative px-4 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-colors text-slate-500 hover:text-slate-900 hover:bg-slate-50" data-id="element-126">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-trophy w-4 h-4" aria-hidden="true" data-id="element-127">
                            <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"></path>
                            <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"></path>
                            <path d="M18 9h1.5a1 1 0 0 0 0-5H18"></path>
                            <path d="M4 22h16"></path>
                            <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path>
                            <path d="M6 9H4.5a1 1 0 0 1 0-5H6"></path>
                        </svg>
                        <span data-id="element-128">Leaderboard</span>
                    </Link></div>
                <div className="flex items-center space-x-4" data-id="element-130">
                    <button
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50"
                        data-id="element-131">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-search w-5 h-5" aria-hidden="true" data-id="element-132">
                            <path d="m21 21-4.34-4.34"></path>
                            <circle cx="11" cy="11" r="8"></circle>
                        </svg>
                    </button>
                    <button
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50 relative"
                        data-id="element-133">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="lucide lucide-bell w-5 h-5" aria-hidden="true" data-id="element-134">
                            <path d="M10.268 21a2 2 0 0 0 3.464 0"></path>
                            <path
                                d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>
                        </svg>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"
                              data-id="element-135"></span>
                    </button>
                    <div className="h-6 w-px bg-slate-200 mx-2" data-id="element-136"></div>
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={handleAvatarClick}
                            className="flex items-center space-x-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                            data-id="element-137">
                            <div
                                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium shadow-sm"
                                data-id="element-138">JD
                            </div>
                        </button>
                        {
                            open && (
                                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200" data-id="element-52">
                                    <div className="px-4 py-3 border-b border-gray-100" data-id="element-53">
                                        <p className="text-sm font-medium text-gray-900" data-id="element-54">John Doe</p>
                                        <p className="text-xs text-gray-500 truncate" data-id="element-55">john.doe@example.com</p>
                                    </div>
                                    <div className="py-1" data-id="element-56">
                                        <Link to="/users/me" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" data-id="element-57">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round" className="lucide lucide-user h-4 w-4 text-gray-400"
                                                 aria-hidden="true" data-id="element-58">
                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                            Your Profile
                                        </Link>
                                        <Link to="#" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors" data-id="element-59">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round" className="lucide lucide-settings h-4 w-4 text-gray-400"
                                                 aria-hidden="true" data-id="element-60">
                                                <path
                                                    d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                                <circle cx="12" cy="12" r="3"></circle>
                                            </svg>
                                            Settings
                                        </Link>
                                    </div>
                                    <div className="border-t border-gray-100 py-1" data-id="element-61">
                                        <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors" data-id="element-62">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round" className="lucide lucide-log-out h-4 w-4"
                                                 aria-hidden="true" data-id="element-63">
                                                <path d="m16 17 5-5-5-5"></path>
                                                <path d="M21 12H9"></path>
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            </svg>
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;