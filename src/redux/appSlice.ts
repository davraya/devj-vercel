import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface AppState {
    userId: string | null;
    loggedIn: boolean;
    jwtToken: string | null;
};    


const initialState: AppState = {
  jwtToken: localStorage.getItem('jwtToken'),
  userId: localStorage.getItem('userId'),
  loggedIn: !!localStorage.getItem('jwtToken'),
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        updateUserId(state, action: PayloadAction<string>) {
            state.userId = action.payload;
            
            localStorage.setItem('userId', action.payload);
        },
        login(state, action: PayloadAction<string>) {
            state.loggedIn = true;
            state.jwtToken = action.payload;
            localStorage.setItem('jwtToken', action.payload);
        },
        logout(state) {
            state.loggedIn = false;
            state.jwtToken = null;
            state.userId = "";
            // Clear only specific localStorage items
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userPicture');
        },
        clearAllData(state) {
            // Reset to initial state
            state.loggedIn = false;
            state.jwtToken = null;
            state.userId = "";
            // Clear only specific localStorage items
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('userPicture');
        },
    },
});

export const { updateUserId, login, logout, clearAllData } = appSlice.actions;
export default appSlice.reducer;    