import { Route, Routes } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import JournalScreen from "../screens/JournalScreen";
import ApplicationsScreen from "../screens/ApplicationsScreen";
import { ProtectedRoute } from "./ProtectedRoute";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";


const AppRoutes = () => {

    const loggedIn = useSelector((state: RootState) => state.app.loggedIn);


    return (
      <Routes>
        <Route element={<ProtectedRoute isAuthenticated={loggedIn} />}>
          <Route path="/journal" element={<JournalScreen />} />
          <Route path="/application" element={<ApplicationsScreen />} />
        </Route>

        <Route path="/" element={<LoginScreen />} />
      </Routes>

  );

}

export default AppRoutes;