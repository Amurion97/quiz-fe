import {useEffect, useState} from "react";
import React from "react";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GoogleLogin} from "@react-oauth/google";
import {customAPIv1} from "../../features/customAPI";

const GoogleLoginButton = () => {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);

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
                            .then((data) => {
                                console.log("thunk data:", data);
                                setOpen(false);
                                setOpenSuccess(true);
                            })
                            .catch((error) => {
                                setOpen(true);
                                if (error.message.includes("409")) {
                                    setStatusCode(409);
                                } else {
                                    console.log("Error:", error);
                                }
                            });
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
