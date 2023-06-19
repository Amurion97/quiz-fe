// import GoogleLogin from "react-google-login";
// import React from "react";
// import { refreshTokenSetup } from "./RefreshTokenSetup/refreshTokenSetup";

// const clientId =
//     "Y617785787921-qojergrtmv4vlul99dpd1bf8i11v5103.apps.googleusercontent.com";
// export function GoogleLoginButton() {
//     const onSuccess = (res) => {
//         console.log("[Login] Success cureent User :", res.profileObj);
//         refreshTokenSetup(res);
//     };
//     const onFailure = (res) => {
//         console.log("[Login] Failed cureent User :", res);
//     };
//     return (
//         <>
//             <GoogleLogin
//                 clientId={clientId}
//                 buttonText="Login"
//                 onSuccess={onSuccess}
//                 onFailure={onFailure}
//                 cookiePolicy={"single_host_origin"}
//                 style={{ marginTop: "100px" }}
//                 isSignedIn={true}
//             />
//         </>
//     );
// }

// import { useGoogleLogin } from "react-google-login";
// import { refreshTokenSetup } from "./RefreshTokenSetup/refreshTokenSetup";
// const clientId =
//     "617785787921-qojergrtmv4vlul99dpd1bf8i11v5103.apps.googleusercontent.com";
// export function GoogleLoginButton() {
//     const onSuccess = (res) => {
//         console.log("[Login] Success cureent User :", res.profileObj);
//         refreshTokenSetup(res);
//     };
//     const onFailure = (res) => {
//         console.log("[Login] Failed cureent User :", res);
//     };
//     const { signIn } = useGoogleLogin({
//         clientId,
//         onSuccess,
//         onFailure,
//         isSignedIn: true,
//         accessType: "offline",
//     });

//     return (
//         <button onClick={signIn} className="button">
//             <img src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button.png" ></img>
//             <span className="buttonText">Login with Google </span>
//         </button>
//     );
// }

import { useEffect, useState } from "react";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { customAPIv1 } from "../../features/customAPI";
const GoogleLoginButton = () => {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [statusCode, setStatusCode] = useState(0);

    return (
        <div style={{ marginTop: 20 }}>
            <GoogleOAuthProvider clientId="617785787921-qojergrtmv4vlul99dpd1bf8i11v5103.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        console.log(
                            "[Login] Success cureent User :",
                            credentialResponse.profileObj
                        );
                        customAPIv1
                            .post(
                                "loginWithGoogle",
                                credentialResponse.credential
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
