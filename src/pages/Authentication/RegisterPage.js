import {Helmet} from 'react-helmet-async';
// @mui
import {styled} from '@mui/material/styles';
import {Link, Container, Typography} from '@mui/material';
// hooks
// components
import Logo from '../../components/logo';
import RegisterForm from '../../components/Forms/Authentication/RegisterForm';

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

export default function RegisterPage() {
    return (
        <>
            <Helmet>
                <title> Register | Quiz </title>
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
                        Chào mừng bạn đến trang đăng ký tài khoản 😍
                    </Typography>
                    <img src="/assets/illustrations/All the data-rafiki.png" alt="login"/>
                </StyledSection>

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Đăng ký tài khoản Quiz
                        </Typography>

                        <Typography variant="body2" sx={{mb: 0}}>
                            Bạn đã có sẵn một tài khoản? {''}
                            <Link href="/login">Hãy đăng nhập nào...</Link>
                        </Typography>

                        <RegisterForm/>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
