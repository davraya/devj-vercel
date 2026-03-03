import "./ApplicationMenuOptions.css"
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { removeInterviewLocal } from "../redux/interviewSlice";
import { deleteInterview } from "../api/interview";

interface ApplicationMenuOptionsProps {
    applicationId: string;
}

const ApplicationMenuOptions = ({applicationId}: ApplicationMenuOptionsProps) => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const userId = useSelector((state: RootState) => state.app.userId);
    const jwtToken = useSelector((state: RootState) => state.app.jwtToken);


    const handleDeleteEntry = async () => {
            if (!userId || !jwtToken || !applicationId) return;
            try{
                await deleteInterview(userId, jwtToken, applicationId);
                dispatch(removeInterviewLocal(applicationId));
    
            } catch (err) {
                console.error("Failed to delete entry", err);
            }
        }

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



    return (
        <div className="menu-options" ref={menuRef}>
            <div className="three-dots" onClick={(e) => { e.stopPropagation();  setIsOpen(!isOpen); }}>⋮</div>            
                { isOpen && (
                <div className="options">
                    <div className="delete-button" onClick={handleDeleteEntry}>Delete</div>
                </div>
                )}
            </div>
    )
}

export default ApplicationMenuOptions;