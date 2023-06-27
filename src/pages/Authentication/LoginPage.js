import {Helmet} from 'react-helmet-async';
// @mui
import {styled} from '@mui/material/styles';
import {Link, Container, Typography} from '@mui/material';
// hooks
// components
import Logo from '../../components/logo';
import LoginForm from '../../components/Forms/Authentication/LoginForm';
import {Alert} from "@mui/lab";

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({theme}) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // boxShadow: theme.customShadows.card,
    // backgroundColor: theme.palette.background.default,
    // backgroundColor: '#f9fafb',
}));

const StyledContent = styled('div')(({theme}) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {

    return (
        <>
            <Helmet>
                <title> Login | Quiz </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: {xs: 16, sm: 24, md: 40},
                        left: {xs: 16, sm: 24, md: 40},
                    }}
                />

                <StyledSection>
                    <Typography variant="h3" sx={{px: 5, mt: 10, mb: 5}}>
                        Chào mừng bạn trở lại 😊
                    </Typography>
                    <img src="/assets/illustrations/we are open-amico.png" alt="login"/>
                </StyledSection>

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Đăng nhập vào Quiz
                        </Typography>

                        <Typography variant="body2" sx={{mb: 5}}>
                            Bạn không có tài khoản? {''}
                            <Link href="/register">Tạo tài khoản mới...</Link>
                        </Typography>

                        <LoginForm/>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
