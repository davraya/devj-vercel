import "./JournalEditor.css"
import { editEntry } from "../api/journal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { editSelectedEntry } from "../redux/journalSlice";


interface JournalEditorProps {
  title: string;
  content: string;
  date?: string;
  
}


const JournalEditor = ({ title, content, date }: JournalEditorProps) => {
    const dispatch = useDispatch();

    const selectedEntryId = useSelector((state: RootState) => state.journal.selectedEntryId);
    const userId = useSelector((state: RootState) => state.app.userId);
    const jwtToken = useSelector((state: RootState) => state.app.jwtToken);
    const journal = useSelector((state: RootState) => state.journal.journal);

    const [localTitle, setLocalTitle] = useState(title);
    const [localContent, setLocalContent] = useState(content);


    useEffect(() => {
        if (!userId || !jwtToken || !selectedEntryId) return;

        const timeout = setTimeout(async () => {
            try {
                await editEntry(
                    userId,
                    jwtToken,
                    selectedEntryId,
                    localContent,
                    localTitle,
                );
                dispatch(
                    editSelectedEntry({
                        id: selectedEntryId,
                        title: localTitle,
                        content: localContent,
                    })
                );

            } catch (err) {
                console.error("Failed to save entry", err);
                }   
        }, 500);

        return () => clearTimeout(timeout); 
    }, [localTitle, localContent, selectedEntryId, userId, jwtToken, dispatch]);

    useEffect(() => {
        const run = async () => {
            const entry = journal?.journalEntries.find((e) => e.id === selectedEntryId);
            if (entry) {
                if (entry.title !== localTitle) setLocalTitle(entry.title);
                if (entry.content !== localContent) setLocalContent(entry.content);
            }
        }
        run();
    }, [selectedEntryId, journal]);

    return (
        <div className="journal-editor">
            <input className="journal-title-input"
                value={localTitle}    
                onChange={(e) => setLocalTitle(e.target.value)}  
                placeholder="Title"
            />
            <div className="journal-date">{date}</div>
            <textarea className="journal-content-textarea"
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                placeholder="Start typing..."
            />
        </div>
    );
}

export default JournalEditor;