import {useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from "formik";
import * as yup from 'yup';
import {TextField,} from 'formik-mui';
// redux
import {useSelector} from "react-redux";
import {customAPIv1} from "../../features/customAPI";
import {selectDepartureSeats, selectDepartureTotal} from "../../features/seat/SeatSlice";
// @mui
import {
    Grid,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog, IconButton, Collapse,
} from '@mui/material';
import {styled, useTheme} from "@mui/material/styles";
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// components
import Ticket from "../Ticket";
import UpperCasingTextField from "./Field/UpperCasingTextField";
import IdentityForm from "./IdentityForm";
import {useState} from "react";
import {Alert} from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";


const StyledContent = styled('div')(({theme}) => ({
    display: 'flex',
    width: "100%",
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: "15px 25px 25px",
    borderRadius: "4px"
}));
const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});
const formSubmition = (values, departureSeats, setSubmitting, setOpenFailedDelete) => {
    console.log("trying to submit:", values);
    let tickets = [];
    for (let i = 0; i < parseInt(departureSeats.seats.length); i++) {
        tickets.push({
            seat: departureSeats.seats[i].id,
            firstName: values[`firstName-${i}`],
            middleName: values[`middleName-${i}`],
            lastName: values[`lastName-${i}`],
            dob: values[`dob-${i}`],
            idNo: values[`idNo-${i}`],
        })
    }
    console.log("tickets:", tickets)
    try {
        customAPIv1().post("/bookings", {
            fullName: values.fullName,
            phoneNumber: values.phoneNumber,
            email: values.email,
            tickets: tickets
        })
            .then(() => {
                setSubmitting(false)
            })
            .catch(e => {
                console.log("error in save booking:", e);
                setOpenFailedDelete(true);
                setSubmitting(false)
            })
    } catch (e) {
        console.log("error in save booking:", e);
        setOpenFailedDelete(true)
    }
}
// ----------------------------------------------------------------------

export default function FinalizeForm(props) {
    const navigate = useNavigate();
    const theme = useTheme();
    const departureSeats = useSelector(selectDepartureSeats);
    const total = useSelector(selectDepartureTotal);
    const [openFailedDelete, setOpenFailedDelete] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    console.log("departure:", departureSeats);
    return (
        <>
            <StyledContent>
                <Formik
                    initialValues={{}}
                    validate={(values) => {
                        const errors = {};
                        // if (!values["email"]) {
                        //     errors["email"] = 'Required';
                        // } else if (
                        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                        // ) {
                        //     errors.email = 'Invalid email address';
                        // }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        console.log("trying to submit:", values);
                        formSubmition(values, departureSeats, setSubmitting, setOpenFailedDelete);
                        handleClickOpenDialog();
                    }}
                >
                    {({values, submitForm, resetForm, isSubmitting, touched, errors, setFieldValue}) =>
                        (
                            <Form>
                                {/*<p>{JSON.stringify(values)}{isSubmitting.toString()}{JSON.stringify(errors)}</p>*/}
                                <Grid container spacing={{xs: 1, md: 2}}
                                      style={{
                                          display: (props.activeStep == 0) ? "flex" : "none"
                                      }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <p>Booking person's contact information</p>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <Field
                                            component={TextField}
                                            type="text"
                                            label="Full Name"
                                            name="fullName"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Field
                                            component={UpperCasingTextField}
                                            name={`email`}
                                            type="email"
                                            label="Email"
                                            helperText="Please Enter Email to receive booking confirmation"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Field
                                            component={TextField}
                                            name={`phoneNumber`}
                                            type="text"
                                            label="Phone Number"
                                            helperText="Please Enter Phone Number for contact"
                                            fullWidth
                                        />
                                    </Grid>
                                    {departureSeats.seats.map((item, index) => (
                                        <Grid item xs={12} sm={12} md={12}>
                                            <IdentityForm activeStep={props.activeStep}
                                                          name={item.name}
                                                          setFieldValue={setFieldValue}
                                                          index={index}>
                                            </IdentityForm>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid container spacing={{xs: 1, md: 2}}
                                      style={{
                                          display: (props.activeStep == 1) ? "flex" : "none"
                                      }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <p>Please make sure the tickets details are correct!</p>
                                    </Grid>
                                    {departureSeats.seats.map((seat, index) => (
                                        <Grid item xs={12} sm={12} md={12}>
                                            <Ticket index={index} name={seat.name} values={values}
                                                    flight={departureSeats.flight} class={seat.class}/>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Grid container spacing={{xs: 1, md: 2}}
                                      style={{
                                          display: (props.activeStep == 2) ? "flex" : "none"
                                      }}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <p>Choose your payment method</p>
                                        {/*<p>Total: {total}</p>*/}
                                        <p>Total: {departureSeats.seats.reduce(function (sum, item) {
                                            return sum + item.price
                                        }, 0).toLocaleString("de-DE")} VND</p>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6}>
                                        <Button type="button" fullWidth size="large" color="inherit" variant="outlined"
                                                onClick={() => {
                                                    console.log("clicked")
                                                    submitForm()
                                                }}>
                                            <PaymentIcon/>Pay with card
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6}>
                                        <Button type="button" fullWidth size="large" color="inherit" variant="outlined"
                                                onClick={submitForm}>
                                            <AccountBalanceIcon/> Online Banking
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Dialog
                                    open={openDialog}
                                    onClose={() => {
                                        handleCloseDialog()
                                        setOpenFailedDelete(false)
                                    }}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    maxWidth='xs'
                                    fullWidth
                                >
                                    <DialogTitle id="alert-dialog-title" style={{color: theme.palette.primary.main}}>
                                        {"Notification"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <Collapse in={openFailedDelete}>
                                            <Alert
                                                action={
                                                    <IconButton
                                                        aria-label="close"
                                                        color="inherit"
                                                        size="small"
                                                        onClick={() => {
                                                            setOpenFailedDelete(false);
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="inherit"/>
                                                    </IconButton>
                                                }
                                                sx={{mb: 2}}
                                                variant="filled" severity="error"
                                            >
                                                Error! Please check the form missing field.
                                            </Alert>
                                        </Collapse>
                                        {!openFailedDelete && "Thank you!"}
                                    </DialogContent>
                                    <DialogActions>
                                    </DialogActions>
                                </Dialog>
                            </Form>
                        )
                    }
                </Formik>
            </StyledContent>
        </>
    )
}
