import {Helmet} from "react-helmet-async";
// @mui
import {styled} from "@mui/material/styles";
import {Container, Typography} from "@mui/material";
// hooks
// components
import Logo from "../../components/logo";
import ResetPasswordForm from "../../components/Forms/Authentication/ResetPasswordForm";

// ----------------------------------------------------------------------
import {StyledContent, StyledRoot, StyledSection} from "./LoginPage";

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
    return (
        <>
            <Helmet>
                <title> Tạo mật khẩu mới | Quiz </title>
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
                       Cùng tạo lại mật khẩu nào 😉
                    </Typography>
                    <img
                        src="/assets/illustrations/Forgot password-amico.png"
                        alt="login"
                    />
                </StyledSection>

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Nhập mật khẩu mới 
                        </Typography>

                        <ResetPasswordForm/>

                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
