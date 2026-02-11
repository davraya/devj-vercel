import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { JournalResponse } from "../types/JournalResponse";

interface JournalState {
  journal: JournalResponse | null;
  lastFetched: number | null;
  selectedEntryId?: string | null;
}

const initialState: JournalState = {
  journal: null,
  lastFetched: null,
  selectedEntryId: null,
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    setJournalStore(state, action: PayloadAction<JournalResponse | null>) {
      state.journal = action.payload;
      state.lastFetched = action.payload ? Date.now() : null;
    },
    clearJournal(state) {
      state.journal = null;
      state.lastFetched = null;
    },
    setSelectedEntryId(state, action: PayloadAction<string | null>) {
      state.selectedEntryId = action.payload;
    },
    editSelectedEntry( state, action: PayloadAction<{ id: string; title: string; content: string }>) {
      if (!state.journal) return;

      const entry = state.journal.journalEntries.find(
        (e) => e.id === action.payload.id
      );

      if (!entry) return;

      entry.title = action.payload.title;
      entry.content = action.payload.content;
    }
  },
});

export const { setJournalStore, clearJournal, setSelectedEntryId, editSelectedEntry } = journalSlice.actions;
export default journalSlice.reducer;

