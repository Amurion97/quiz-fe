


import { Link, Container, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
// MUI----------------------------------------------------------------


import { Helmet } from "react-helmet-async";
// React---------------------------------------------------------------- 

import Logo from "../../components/logo";
// Logo-------------------------------------------------------------------


import RegisterForm from "../../components/Forms/Authentication/RegisterForm";
// Componnet-------------------------------------------------------------------



const StyledRoot = styled("div")(({ theme }) => ({
    display: "flex",
}));

const StyledSection = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}));

const StyledContent = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(12, 0),
}));

export default function RegisterPage() {
    return (
        <>
            <Helmet>
                <title>Register | Quiz</title>
            </Helmet>

            <StyledRoot>
                <Grid container>
                    <Grid item xs={0} sm={0} md={6} 
                    sx={{
                        display: {
                            xs: 'none',
                            md: 'initial',
                        }
                    }}
                        >
                        <StyledSection>
                            <Typography
                                variant="h3"
                                sx={{ px: 5, mt: 10, mb: 5 }}
                            >
                                Hi, Welcome to Quiz
                            </Typography>
                            <img
                                src="/assets/illustrations/All the data-rafiki.png"
                                alt="login"
                            />
                        </StyledSection>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: "flex", alignItems: "center" , mt:4}}
                    >
                        <Container maxWidth="sm">
                            <Grid container direction="column" spacing={2}>
                                <Grid item >
                                    <Logo
                                        sx={{
                                            position: "fixed",
                                            top: { xs: 16, sm: 24, md: 40 },
                                            left: { xs: 16, sm: 24, md: 40 },
                                        }}
                                    />
                                </Grid>

                                <Grid item>
                                    <Typography variant="h4" gutterBottom>
                                        Register in to Quiz
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <Typography variant="body2" sx={{ mb: 0 }}>
                                        Do you already have an account?{" "}
                                        <Link href="/login">Login Here</Link>
                                    </Typography>
                                </Grid>

                                <Grid item>
                                    <RegisterForm />
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </StyledRoot>
        </>
    );
}
