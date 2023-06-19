import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import { Link, Container, Typography } from "@mui/material";
// hooks
// components
import Logo from "../components/logo";
// sections
import ForgotPasswordForm from "../components/Forms/ResetRequestForm";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        display: "flex",
    },
}));

const StyledSection = styled("div")(({ theme }) => ({
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    // boxShadow: theme.customShadows.card,
    // backgroundColor: theme.palette.background.default,
    // backgroundColor: '#f9fafb',
}));

const StyledContent = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
    return (
        <>
            <Helmet>
                <title> Forgot Password | Quiz </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: "fixed",
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                />

                <StyledSection>
                    <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                        Hi, Reset your password?
                    </Typography>
                    <img
                        src="/assets/illustrations/Forgot password-amico.png"
                        alt="login"
                    />
                </StyledSection>

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Find your account
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 5 }}>
                            Please enter your email to search
                            for your account. <br/>
                            Do you remember your password? {""}
                            <Link href="/login">Login Here</Link>
                        </Typography>
                        <ForgotPasswordForm />
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
