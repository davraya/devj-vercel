import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse  } from '@react-oauth/google';
import { handleCredentialResponse } from '../api/auth';
import { useDispatch } from 'react-redux';
import { login } from "../redux/appSlice";



const LoginScreen = () => {
    const dispatch = useDispatch();


    const handleLogin = async (credentialResponse: CredentialResponse) => {

        
        try {
            // Small delay to show the initial message
            await new Promise<void>(resolve => setTimeout(resolve, 500));
            
            const userInfo = await handleCredentialResponse(credentialResponse);
            const jwtToken = userInfo.jwtToken;

            localStorage.setItem('token', jwtToken);
            dispatch(login(jwtToken));

            localStorage.setItem('userId', userInfo.userId);

            console.log("Login successful, user ID:", userInfo.userId);
  

                        
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