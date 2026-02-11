import type { EntryResponse } from "../types/JournalResponse";
import { useDispatch } from "react-redux";
import { setSelectedEntryId } from "../redux/journalSlice";


import "./JournalList.css"

interface JournalListProps {
  entries: EntryResponse[];
}

const JournalList = ({ entries }: JournalListProps) => {

    const dispatch = useDispatch();



    return (
        <div className="journal-list-container">


            <div className="journal-list-header">
                <button className="add-entry-button" onClick={() => {}}>
                + Add Entry
                </button>
            </div>

            <div className="journal-list-content">

            {entries.map((entry) => {
               return (
                    <div key={entry.id} onClick={() => dispatch(setSelectedEntryId(entry.id))}>
                        <div className="journal-entry-card">
                            <div className="journal-entry-content">
                                <div className="journal-entry-text">
                                    <div className="journal-entry-title">{entry.title}</div>
                                    <div className="journal-entry-date">{entry.date}</div>
                                </div>
                            </div>
                        </div>
                    </div> 
                );
            })}

            </div>
            
            
        </div>
    );
}

export default JournalList;