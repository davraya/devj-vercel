import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse  } from '@react-oauth/google';
import { handleCredentialResponse, handleGuestCredentialResponse } from '../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login, updateUserId } from "../redux/appSlice";
import { useNavigate } from 'react-router-dom';
import type { RootState } from "../redux/store";
import { useEffect } from 'react';
import './LoginScreen.css';





const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector((state: RootState) => state.app.loggedIn);

    useEffect(() => {
        if (loggedIn) {
            navigate("/journal");
        }
    }, [loggedIn, navigate]);

    const handleLogin = async (credentialResponse: CredentialResponse) => {

        try {
           
            
            const userInfo = await handleCredentialResponse(credentialResponse);
            
            dispatch(login(userInfo.jwtToken));
            dispatch(updateUserId(userInfo.userId));

            navigate("/journal");
  
                        
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    const handleGuestLogin = async () => {

        try {
           
            
            const userInfo = await handleGuestCredentialResponse();
            
            dispatch(login(userInfo.jwtToken));
            dispatch(updateUserId(userInfo.userId));

            navigate("/journal");
  
                        
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className='login-sceen'>
            <div className='login-container'>
                <h1 className='login-title'>Dev Journey</h1>
                <p>Please log in with your Google account to continue.</p>
                <div className='google-login-button'>
                    <GoogleOAuthProvider  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <GoogleLogin onSuccess={handleLogin}></GoogleLogin>
                    </GoogleOAuthProvider>
                </div>
                <div className="divider">or</div>

                <button className="guest-button" onClick={handleGuestLogin}>
                Continue as Guest
                </button>

                
            </div>

        </div>
    )
}

export default LoginScreen;