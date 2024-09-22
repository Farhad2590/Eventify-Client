import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';
import Review from './Review';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from './MultipleFormSlice';

const steps = ['Event Details', 'Upload Images', 'Review'];

export default function HorizontalLinearStepper() {

    const currentStep = useSelector(store=>store.formInfo.currentStep)




    const renderForm = (steps) => {
        switch (steps) {
            case 1: return <FirstForm></FirstForm>;

            case 2: return <SecondForm></SecondForm>

            case 3: return <Review></Review>

            default:
                return <FirstForm></FirstForm>;
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={currentStep}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
     
                <React.Fragment>
                    {renderForm(currentStep)}
                </React.Fragment>
            
        </Box>
    );
}
