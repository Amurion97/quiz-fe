import {useEffect, useState} from "react";
import React from "react";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GoogleLogin} from "@react-oauth/google";
import {customAPIv1} from "../../features/customAPI";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {googleLogin} from "../../features/user/userSlice";

const GoogleLoginButton = () => {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <div style={{marginTop: 20}}>
            <GoogleOAuthProvider clientId="617785787921-qojergrtmv4vlul99dpd1bf8i11v5103.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log("credentialResponse:", credentialResponse)
                        customAPIv1()
                            .post(
                                "users/loginWithGoogle",
                                credentialResponse
                            )
                            .then(res => {
                                console.log("axios data:", res);
                                dispatch(googleLogin(res.data.data))
                                setOpen(false);
                                setOpenSuccess(true);
                                let role = res.data.data.info.role;
                                if (role === 1)
                                    navigate("/dashboard/users")
                                else if (role === 2)
                                    navigate("/dashboard/questions")
                                else
                                    navigate("/students")

                            })
                    }}
                    onError={() => {
                        console.log("Login Failed");
                    }}
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default GoogleLoginButton;
