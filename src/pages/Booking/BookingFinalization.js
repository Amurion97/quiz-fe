import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {styled} from "@mui/material/styles";
import {Container, Paper} from "@mui/material";
import FinalizeForm from "../../components/Forms/FinalizeForm";

const StyledRoot = styled('div')(({theme}) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    backgroundImage: theme.palette.background.default,
}));

const steps = ['Fill in your personal information', 'Confirm chosen seats and flights', 'Payment'];

export default function BookingFinalization() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <StyledRoot>
            <Paper elevation={3}/>
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
                <React.Fragment>
                    <Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>
                    <FinalizeForm activeStep={activeStep}/>
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
                        {activeStep < steps.length - 1 ?
                            <Button onClick={handleNext}>
                                Next
                            </Button> : ""}
                    </Box>
                </React.Fragment>
            </Container>
        </StyledRoot>

    );
}