import {Helmet} from 'react-helmet-async';
import {useState} from "react";
// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Button, Container, Grid, Typography} from '@mui/material';
// components
import Logo from '../../components/logo';
import TicketCheckForm from "../../components/Forms/TicketCheckForm";
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
    const [searchForm, setSearchForm] = useState(true)
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
                    <StyledContent>
                        <Container>
                            <Typography variant="h3" color={theme.palette.primary.main} marginTop="45px" gutterBottom>
                                BOOK YOUR FLIGHT TODAY
                            </Typography>

                            <Typography variant="p" sx={{mb: 5}}>
                                If you have already booked, check your tickets here!
                            </Typography>
                            <Grid container spacing={{xs: 1, md: 2}}>
                                <Grid item xs={12} sm={8} md={6}>
                                    <Button fullWidth size="large" type="button" variant="contained" onClick={() => {
                                        setSearchForm((pre) => !pre)
                                    }}>
                                        {searchForm ? "Find my booking" : "Back to search"}
                                    </Button>
                                </Grid>
                            </Grid>

                        </Container>
                        {searchForm ? <SearchForm/> : <TicketCheckForm/>}

                    </StyledContent>
                </Container>
            </StyledRoot>
        </>
    );
}
