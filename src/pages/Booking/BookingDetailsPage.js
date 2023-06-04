// @mui
import {styled, useTheme} from '@mui/material/styles';
import {Grid, Container, Slide, Typography, Button} from '@mui/material';
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {TextField} from "formik-mui";
import UpperCasingTextField from "../../components/Forms/Field/UpperCasingTextField";
import Ticket from "../../components/Ticket";
// components

// sections
const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    backgroundImage: theme.palette.background.default,
}));
const StyledContent = styled('div')(({theme}) => ({
    display: 'flex',
    width: "100%",
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: "15px 25px 25px",
    borderRadius: "4px"
}));
// ----------------------------------------------------------------------

export default function BookingDetailsPage() {
    const params = useParams();
    const {state} = useLocation();
    const [booking, setBooking] = useState(state);
    const theme = useTheme();
    const navigate = useNavigate();

    console.log("state:", state);
    console.log("booking:", booking);

    return (
        <>
            <StyledRoot>
                <Slide direction="up" in={true} mountOnEnter unmountOnExit>
                    <Container maxWidth="lg" style={{
                        padding: "15px 25px 25px"
                    }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12}>
                                {/*{JSON.stringify(booking)}*/}
                                {booking &&
                                    (
                                        <StyledContent>
                                            <Formik
                                                initialValues={{
                                                    fullName: booking.fullName,
                                                    phoneNumber: booking.phoneNumber,
                                                    email: booking.email
                                                }}
                                                validate={(values) => {
                                                    const errors = {};
                                                    return errors;
                                                }}
                                                onSubmit={() => {
                                                }}
                                            >
                                                {({
                                                      values,
                                                      submitForm,
                                                      resetForm,
                                                      isSubmitting,
                                                      touched,
                                                      errors,
                                                      setFieldValue
                                                  }) =>
                                                    (
                                                        <Form>
                                                            {/*<p>{JSON.stringify(values)}{isSubmitting.toString()}{JSON.stringify(errors)}</p>*/}
                                                            <Grid container spacing={{xs: 1, md: 2}}>
                                                                <Grid item xs={12} sm={12} md={12}>
                                                                    <Grid container spacing={3} alignItems="center">
                                                                        <Grid item xs={6} sm={9} md={9}>
                                                                            <Typography variant="body1" gutterBottom
                                                                                        color={theme.palette.primary.main}>
                                                                                <p>Booking person's contact
                                                                                    information</p>
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={6} sm={3} md={3}>
                                                                            <Button variant="contained" color="primary"
                                                                                    fullWidth
                                                                                    onClick={() => {
                                                                                        navigate("/search")
                                                                                    }
                                                                                    }>
                                                                                Back to search
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>

                                                                    {/*<p>{JSON.stringify(values)}</p>*/}
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={12}>
                                                                    <Field
                                                                        component={TextField}
                                                                        type="text"
                                                                        label="Full Name"
                                                                        name="fullName"
                                                                        fullWidth
                                                                        disabled
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6}>
                                                                    <Field
                                                                        component={UpperCasingTextField}
                                                                        name={`email`}
                                                                        type="email"
                                                                        label="Email"
                                                                        fullWidth
                                                                        disabled
                                                                    />
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6}>
                                                                    <Field
                                                                        component={TextField}
                                                                        name={`phoneNumber`}
                                                                        type="text"
                                                                        label="Phone Number"
                                                                        fullWidth
                                                                        disabled
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                            <br/>
                                                            <Grid item xs={12} sm={12} md={12}>
                                                                <Typography variant="body1" gutterBottom
                                                                            color={theme.palette.primary.main}>
                                                                    <p>Tickets details</p>
                                                                </Typography>
                                                            </Grid>
                                                            <Grid container spacing={{xs: 1, md: 2}}>
                                                                {booking.tickets.map((ticket, index) => (
                                                                    <Grid item xs={12} sm={12} md={12}>
                                                                        <Ticket index={index}
                                                                                name={ticket.seat.row.name + ticket.seat.no}
                                                                                values={values}
                                                                                flight={ticket.seat.row.flight}
                                                                                class={ticket.seat.row.class.name}
                                                                                notFinal={true}
                                                                                firstName={ticket.firstName}
                                                                                middleName={ticket.middleName}
                                                                                lastName={ticket.lastName}
                                                                        />
                                                                    </Grid>
                                                                ))}
                                                            </Grid>

                                                        </Form>
                                                    )
                                                }
                                            </Formik>
                                        </StyledContent>
                                    )
                                }

                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <Grid container spacing={3} alignItems="center">


                                </Grid>
                            </Grid>
                        </Grid>

                    </Container>
                </Slide>
            </StyledRoot>
        </>
    );
}
