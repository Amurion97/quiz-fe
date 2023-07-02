


import { Link, Container, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
// MUI----------------------------------------------------------------


import { Helmet } from "react-helmet-async";
// React---------------------------------------------------------------- 

import Logo from "../../components/logo";
// Logo-------------------------------------------------------------------


import RegisterForm from "../../components/Forms/Authentication/RegisterForm";
import ForgotPasswordForm from "../../components/Forms/Authentication/ResetRequestForm";
// Componnet-------------------------------------------------------------------
import {StyledContent, StyledRoot, StyledSection} from "./LoginPage";
import {useLocation} from "react-router-dom";

export default function RegisterPage() {

    const location = useLocation()
    console.log("location in register:", location);
    const {state} = location;
    let code = state && state['code'] ? state['code'] : undefined;

    return (
        <>
            <Helmet>
                <title>Register | Quiz</title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: "fixed",
                        top: {xs: 16, sm: 24, md: 40},
                        left: {xs: 16, sm: 24, md: 40},
                    }}
                />

                <StyledSection>
                    <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
                        Chào mừng bạn đến trang đăng ký tài khoản 😍
                    </Typography>
                    <img src="/assets/illustrations/All the data-rafiki.png" alt="login"/>
                </StyledSection>

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Đăng ký tài khoản Quiz
                        </Typography>

                        <Typography variant="body2">
                            Bạn đã có sẵn một tài khoản? {''}
                            <Link href="/login">Hãy đăng nhập nào...</Link>
                        </Typography>

                        <RegisterForm code={code}/>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
