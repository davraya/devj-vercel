import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse  } from '@react-oauth/google';
import { handleCredentialResponse } from '../api/auth';
import { useDispatch } from 'react-redux';
import { login, updateUserId } from "../redux/appSlice";
import { useNavigate } from 'react-router-dom';





const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


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


    return (
        <>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <GoogleLogin
                onSuccess={handleLogin}
                ></GoogleLogin>
        </GoogleOAuthProvider>
        </>
    )
}

export default LoginScreen;