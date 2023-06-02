import {Helmet} from 'react-helmet-async';
// @mui
import {styled, useTheme} from '@mui/material/styles';
import { Container, Typography} from '@mui/material';
// hooks
// components
import Logo from '../../components/logo';
import SearchForm from "../../components/Forms/SearchForm";
// sections


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    backgroundImage: "url(/assets/images/background.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%"
}));

const StyledContent = styled('div')(({theme}) => ({
    // background: "transparent",
    maxHeight: "70%",
    margin: 'auto',
    // minHeight: '100vh',
    display: 'flex',
    justifyContent: 'space-evenly',
    width: "60%",
    flexDirection: 'row',
    padding: theme.spacing(12, 0),
    // backgroundColor: '#f9fafb',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateY(-50%) translateX(-50%)"
}));

// ----------------------------------------------------------------------

export default function SearchPage() {
    const theme = useTheme();
    return (
        <>
            <Helmet>
                <title> Search | Flight </title>
            </Helmet>

            <StyledRoot>
                <Logo
                    sx={{
                        position: 'fixed',
                        top: {xs: 16, sm: 24, md: 40},
                        left: {xs: 16, sm: 24, md: 40},
                    }}
                />

                <Container>
                    <StyledContent className={"ggg"}>
                        <Container >
                            <Typography variant="h3" color={theme.palette.primary.main} marginTop="45px" gutterBottom>
                                BOOK YOUR FLIGHT TODAY
                            </Typography>

                            <Typography variant="p" sx={{mb: 5}}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate laboriosam numquam at
                            </Typography>
                        </Container>
                        <SearchForm/>
                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
