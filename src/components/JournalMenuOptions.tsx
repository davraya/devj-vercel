import "./JournalMenuOptions.css"
import { useState, useRef, useEffect } from "react";
import {deleteEntry} from "../api/journal";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { deleteEntryStore, setSelectedEntryId } from "../redux/journalSlice";


const JournalMenuOptions = () => {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const userId = useSelector((state: RootState) => state.app.userId);
    const jwtToken = useSelector((state: RootState) => state.app.jwtToken);
    const selectedEntryId = useSelector((state: RootState) => state.journal.selectedEntryId);


    const handleDeleteEntry = async () => {
            if (!userId || !jwtToken || !selectedEntryId) return;
            try{
                await deleteEntry(userId, jwtToken, selectedEntryId);
                dispatch(deleteEntryStore(selectedEntryId));
                dispatch(setSelectedEntryId(null));
    
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

export default JournalMenuOptions;