import "./JournalEditor.css"
import { editEntry } from "../api/journal";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { editSelectedEntry } from "../redux/journalSlice";
import JournalMenuOptions from "./JournalMenuOptions";

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


    const lastEntryIdRef = useRef<string | null>(null);

    useEffect(() => {
    const run = async () => {
        if (selectedEntryId && selectedEntryId !== lastEntryIdRef.current) {
            const entry = journal?.journalEntries.find((e) => e.id === selectedEntryId);
            if (entry) {
                setLocalTitle(entry.title);
                setLocalContent(entry.content);
                lastEntryIdRef.current = selectedEntryId;
            }
        }
    }
    run();
    }, [selectedEntryId, journal]);



    if (!selectedEntryId) {
        return (
            <div className="journal-editor empty-state">
                <p>Select an entry to start editing</p>
            </div>
        );
    }

    return (

        <div className="journal-editor">

            <div className="journal-editor-header">
                <div>
                    <input 
                    data-cy="journal-title-input"
                    className="journal-title-input"
                    value={localTitle}    
                    onChange={(e) => setLocalTitle(e.target.value)}  
                    placeholder="Title"/>
                    <div className="journal-date">{date}</div>
                </div>
                <div className="delete-button-container">
                    <JournalMenuOptions />
                </div>
            </div>
            
            <textarea 
                data-cy="journal-content-textarea"
                className="journal-content-textarea"
                value={localContent}
                onChange={(e) => setLocalContent(e.target.value)}
                placeholder="Start typing..."
            />
        </div>
    );
}

export default JournalEditor;