import EventFormStepper from '../../Components/AddEventComponents/EventFormStepper'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const AddEvent = () => {
    return (
        <div className="container mx-auto">
            <h3 className="text-4xl text-center font-medium my-10">Add Event Form</h3>
            <Container>
                <Box borderRadius={'10px'} padding={'20px'} sx={{ bgcolor: '#cfe8fc' }}>
                <EventFormStepper></EventFormStepper>
                </Box>
            </Container>
            
        </div>
    );
};

export default AddEvent;