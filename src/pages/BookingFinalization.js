import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {styled} from "@mui/material/styles";
import {Container, Grid, Paper} from "@mui/material";
import BookingBar from "../components/BookingBar";
import FlightList from "../components/FlightList";
import SeatChoosingWindow from "../components/SeatChoosingWindow";
import IdentityForm from "../components/IdentityForm";

const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    backgroundImage: theme.palette.background.default,
}));

const steps = ['Fill in your personal information', 'Confirm chosen seats and flights', 'Payment'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // function stepRenderSwitch(param) {
    //     switch(param) {
    //         case 0:
    //             return (<IdentityForm/>);
    //         default:
    //             return 'foo'
    //     }
    // }

    return (
        <StyledRoot>
            <Paper elevation={3} />
            <Container maxWidth="lg" style={{
                padding: "15px 25px 25px"
            }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    )}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{mt: 2, mb: 1}}>
                            All steps completed - you&apos;re finished!
                            Please check your email for ticket information
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <Button onClick={handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>
                        <IdentityForm activeStep={activeStep}/>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{mr: 1}}
                            >
                                Back
                            </Button>
                            <Box sx={{flex: '1 1 auto'}}/>
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Container>
        </StyledRoot>

    );
}