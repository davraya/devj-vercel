import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { fetchJournal } from "../api/journal";
import { useDispatch } from "react-redux";
import { setJournalStore } from "../redux/journalSlice";
import "./JournalScreen.css";
import JournalList from "../components/JournalList";
import JournalEditor from "../components/JournalEditor";



const JournalScreen = () => {
    const dispatch = useDispatch();

    const jwtToken = useSelector((state: RootState) => state.app.jwtToken);
    const userId = useSelector((state: RootState) => state.app.userId);
    const journal = useSelector((state: RootState) => state.journal.journal);
    const selectedEntryId = useSelector((state: RootState) => state.journal.selectedEntryId);

    const selectedEntry = journal?.journalEntries.find(entry => entry.id === selectedEntryId);  
   


    useEffect(() => {

        const runAsync = async () => {
            if (!jwtToken || !userId) return;
            const userJournal = await fetchJournal(userId, jwtToken);
            dispatch(setJournalStore(userJournal));
        };

        runAsync();
    }, [jwtToken, userId, dispatch]);


    return (
        <div className="journal-container">
            <JournalList entries={journal?.journalEntries ?? []}/>
            <JournalEditor title={selectedEntry?.title ?? ""} content={selectedEntry?.content ?? ""} date={selectedEntry?.date ?? ""}/>
        </div>
    )


}

export default JournalScreen;