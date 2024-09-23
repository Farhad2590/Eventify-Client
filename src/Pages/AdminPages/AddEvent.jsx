import EventFormStepper from '../../Components/AddEventComponents/EventFormStepper'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';

const AddEvent = () => {
    return (
        <div className="container mx-auto">
            <TitleAndSubheading title="Add Event Form"></TitleAndSubheading>
            <Container>
                <Box borderRadius={'10px'} padding={'20px'} sx={{ bgcolor: '#cfe8fc' }}>
                <EventFormStepper></EventFormStepper>
                </Box>
            </Container>
            
        </div>
    );
};

export default AddEvent;