import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    IconButton
} from "@mui/material";
import {
    Add as AddIcon,
    Remove as RemoveIcon
} from "@mui/icons-material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import FlatwareIcon from '@mui/icons-material/Flatware';
import CakeIcon from '@mui/icons-material/Cake';
import Groups2Icon from '@mui/icons-material/Groups2';




const ModeratorStaffs = () => {
    const [events, setEvents] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [photografferPerson, setPhotografferPerson] = useState(0);
    const [waiterPerson, setWaiterPerson] = useState(0);
    const [vediographer, setVediographer] = useState(0);
    const [cakePound, setcakePound] = useState(0);
    const [clubsSF, setClubsSF] = useState(0);
    const [soundPairCount, setSoundPairCount] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState("");

    // Prices for each new item
    const photografferPersonPrice = 1000; // per photographer person
    const waiterPersonPrice = 500; // per waiter person
    const vediographerPrice = 1500; // per vediographer
    const cakePoundPrice = 300; // per cake pound
    const clubsSFPrice = 200; // per square feet of club
    const soundPairPrice = 750; // per pair of sound

    // Function to calculate total amount
    const calculateTotalAmount = () => {
        const photografferAmount = photografferPerson * photografferPersonPrice;
        const waiterAmount = waiterPerson * waiterPersonPrice;
        const vediographerAmount = vediographer * vediographerPrice;
        const cakeAmount = cakePound * cakePoundPrice;
        const clubsAmount = clubsSF * clubsSFPrice;
        const soundPairAmount = soundPairCount * soundPairPrice;

        const totalAmount = photografferAmount + waiterAmount + vediographerAmount + cakeAmount + clubsAmount + soundPairAmount;
        return totalAmount;
    };


    useEffect(() => {
        axiosSecure
            .get(`/eventConfirmed`)
            .then((response) => {
                const filteredEvents = response.data.filter(
                    (event) => event.event_organizer === user.email && event.moderator === "assigned"
                );
                setEvents(filteredEvents);
                if (filteredEvents.length > 0) {
                    setSelectedEvent(filteredEvents[0]._id);
                }
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    }, [axiosSecure, user.email]);

    return (
        <Box sx={{ width: '100%', padding: '10px' }}>
            <TitleAndSubheading title="Add Staffs"></TitleAndSubheading>

            <FormControl fullWidth margin="normal">
                <InputLabel id="event-select-label">Select Event</InputLabel>
                <div className="flex justify-end">
                    <h1 className="text-2xl text-blue-600">Total Amount: {calculateTotalAmount()} Taka</h1>

                </div>
                <Select
                    labelId="event-select-label"
                    id="event-select"
                    value={selectedEvent}
                    label="Select Event"
                    onChange={(e) => setSelectedEvent(e.target.value)}
                >

                    {events.map((event) => (
                        <MenuItem key={event._id} value={event._id}>
                            {event.package_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Grid container spacing={3} marginTop={2}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" display="flex" alignItems="center">
                                <AddAPhotoIcon sx={{ mr: 1 }} /> Photographer Staff Needed
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setPhotografferPerson(Math.max(0, photografferPerson - 1))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{photografferPerson}</Typography>
                                <IconButton onClick={() => setPhotografferPerson(photografferPerson + 1)} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" display="flex" alignItems="center">
                                <FlatwareIcon sx={{ mr: 1 }} /> Waiter Staff Needed
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setWaiterPerson(Math.max(0, waiterPerson - 5))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{waiterPerson}</Typography>
                                <IconButton onClick={() => setWaiterPerson(waiterPerson + 5)} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" display="flex" alignItems="center">
                                <CenterFocusStrongIcon sx={{ mr: 1 }} /> Vediographer Staff Needed
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setVediographer(Math.max(0, vediographer - 1))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{vediographer}</Typography>
                                <IconButton onClick={() => setVediographer(vediographer + 1)} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3} marginTop={2}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" display="flex" alignItems="center">
                                <CakeIcon sx={{ mr: 1 }} /> Birthday Cake Pound
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setcakePound(Math.max(0, cakePound - 1))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{cakePound}</Typography>
                                <IconButton onClick={() => setcakePound(cakePound + 1)} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" display="flex" alignItems="center">
                                <Groups2Icon sx={{ mr: 1 }} /> Clubs in Square Feet
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setClubsSF(Math.max(0, clubsSF - 1020))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{clubsSF}</Typography>
                                <IconButton onClick={() => setClubsSF(clubsSF + 1050)} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" display="flex" alignItems="center">
                                <RecordVoiceOverIcon sx={{ mr: 1 }} /> Sound System Pair
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setSoundPairCount(Math.max(2, soundPairCount - 1))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{soundPairCount}</Typography>
                                <IconButton onClick={() => setSoundPairCount(soundPairCount + 1)} color="primary">
                                    <AddIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                style={{ marginTop: '2rem' }}
            >
                Submit Requirements
            </Button>
        </Box>
    );
};

export default ModeratorStaffs;