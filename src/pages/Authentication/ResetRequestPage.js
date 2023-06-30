import {Helmet} from "react-helmet-async";
// @mui
import {styled} from "@mui/material/styles";
import {Link, Container, Typography} from "@mui/material";
// hooks
// components
import Logo from "../../components/logo";
import ForgotPasswordForm from "../../components/Forms/Authentication/ResetRequestForm";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({theme}) => ({
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
    [theme.breakpoints.down("md")]: {
      display: "none", // Ẩn phần hình ảnh khi hiển thị trên thiết bị di động
    },
  }));

const StyledContent = styled("div")(({theme}) => ({
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

                        <Typography variant="body2" sx={{mb: 5}}>
                            Hãy nhập email để tìm tài khảon của bạn <br/>
                            Bạn đã nhớ lại mật khẩu rồi?  {""}
                            <Link href="/login">Đăng nhập lại nào...</Link>
                        </Typography>
                        <ForgotPasswordForm/>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
