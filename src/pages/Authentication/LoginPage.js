import {Helmet} from "react-helmet-async";
// @mui
import {styled, useTheme} from "@mui/material/styles";
import {Link, Container, Typography} from "@mui/material";
// hooks
// components
import Logo from "../../components/logo";
import LoginForm from "../../components/Forms/Authentication/LoginForm";
import {Alert} from "@mui/lab";
import {useLocation, useNavigate} from "react-router-dom";

// ----------------------------------------------------------------------

export const StyledRoot = styled("div")(({theme}) => ({
    [theme.breakpoints.up("md")]: {
        display: "flex",
    },
}));

export const StyledSection = styled("div")(({theme}) => ({
    width: "100%",
    maxWidth: 480,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
        display: "none", // Ẩn phần hình ảnh khi hiển thị trên thiết bị di động
    },
}));

export const StyledContent = styled("div")(({theme}) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
    const theme = useTheme()

    const navigate = useNavigate()

    const location = useLocation()
    console.log("location in login:", location);
    const {state} = location;
    let code = state && state['code'] ? state['code'] : undefined;
    return (
        <>
            <Helmet>
                <title> Đăng nhập | Quiz </title>
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
                        Chào mừng bạn trở lại 😊
                    </Typography>
                    <img
                        src="/assets/illustrations/we are open-amico.png"
                        alt="login"
                    />
                </StyledSection>

                <Container
                    maxWidth="sm"
                >
                    <StyledContent>

                        {code && <Alert severity="info">
                            Bạn đang tham gia phòng thi với mã {code}, vui lòng đăng nhập!
                            Sau khi đăng kí (nếu chưa có tài khoản) và đăng nhập thành công,
                            hệ thống sẽ tự vào phòng thi
                        </Alert>}


                        <Typography variant="h4" gutterBottom>
                            Đăng nhập vào Quiz
                        </Typography>

                        <Typography variant="body2">
                            Bạn không có tài khoản? {""}
                            <span
                                onClick={() => {
                                    console.log("clicked");
                                    navigate('/register', {
                                        state: {
                                            code: code
                                        }
                                    })
                                }}
                                style={{
                                    cursor: 'pointer',
                                    color: theme.palette.primary.main,
                                    textDecoration: 'underline'
                                }}
                            >Tạo tài khoản mới...</span>
                        </Typography>

                        <LoginForm code={code}/>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
