import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep } from './MultipleFormSlice';


const StepButtons = () => {
    const currentStep = useSelector(store => store.formInfo.currentStep)
    const dispatch = useDispatch()
    console.log(currentStep);


    const handleBack = () => {
        dispatch(setCurrentStep(currentStep - 1));
    };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'row ', }}>
            <div className='flex'>
                <Button

                    disabled={currentStep === 1}
                    onClick={handleBack}
                    sx={{ mr: 1, fontSize: '16px', ':disabled': { border: 'none' }, textTransform: 'none', border: '1px solid #3A86FF', backgroundColor: 'white', color: 'black', ':hover': { backgroundColor: 'pink', border: '1px solid pink' } }}


                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {
                    currentStep < 3 && <Button type='submit' sx={{ fontSize: '16px', textTransform: 'none', border: '1px solid #3A86FF', backgroundColor: 'white', color: 'black', ':hover': { backgroundColor: 'pink', border: '1px solid pink' } }}>
                        Next
                    </Button>
                }
            </div>
        </Box>
    );
};

export default StepButtons;