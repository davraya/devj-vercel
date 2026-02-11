import { Route, Routes } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import JournalScreen from "../screens/JournalScreen";


const AppRoutes = () => {
    return(            
        <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/journal" element={<JournalScreen />} />
            {/* <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
            <Route path="/interviews" element={<ProtectedRoute><InterviewsScreen /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to={jwtToken ? "/home" : "/"} replace />} /> */}
        </Routes>
    )
}
export default AppRoutes;