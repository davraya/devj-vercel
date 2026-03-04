import "./Header.css"
import { useState, useRef, useEffect } from "react";
import type { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "./redux/appSlice";
import { clearJournal } from "./redux/journalSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { clearInterviews } from "./redux/interviewSlice";



const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const loggedIn = useSelector((state: RootState) => state.app.loggedIn);


    // Close menu on any click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        } else {
            setIsOpen(false);
        }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    if (!loggedIn || location.pathname === "/") {
      return null;
    }

    return (
        <div className="header-container">
            <div className="app-name">Dev Journey</div>

            <Navbar />

            <div className="user-menu-container">

                <button className="user-button" onClick={(e) => {setIsOpen(!isOpen); e.stopPropagation();}}>
                  <div className="user-avatar">
                      <span className="user-avatar-icon">👤</span>
                  </div>
                </button>
                
                {isOpen && (
                  <div className="user-menu">
                    <button className="user-menu-item logout" onClick={() => {
                      dispatch(logout());
                      dispatch(clearJournal()); 
                      dispatch(clearInterviews());
                      navigate("/"); 
                      setIsOpen(!isOpen);

                    }}>
                      <span className="user-menu-icon">⤴</span>
                      Logout
                    </button>
                  </div>
                )}
                
            </div>

        </div>

    )
}

export default Header;