import {Helmet} from "react-helmet-async";
// @mui
import { Container, Typography} from "@mui/material";
// hooks
// components
import Logo from "../../components/logo";
import ForgotPasswordForm from "../../components/Forms/Authentication/ResetRequestForm";
import {StyledContent, StyledRoot, StyledSection} from "./LoginPage";
import {Link} from "react-router-dom";

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
    return (
        <>
            <Helmet>
                <title> Quên mật khẩu | Quiz </title>
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
                        Xin chào, hãy cùng nhau lấy lại mật khẩu nào 🧐
                    </Typography>
                    <img
                        src="/assets/illustrations/Forgot password-amico.png"
                        alt="login"
                    />
                </StyledSection>

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Tìm tài khoản của bạn nào
                        </Typography>

                        <Typography variant="body2">
                            Hãy nhập email để tìm tài khoản của bạn <br/>
                            Bạn đã nhớ lại mật khẩu rồi?  {""}
                            <Link to="/login">Đăng nhập lại nào...</Link>
                        </Typography>

                        <ForgotPasswordForm/>

                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
