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
    Chair as ChairIcon,
    TableBar as TableIcon,
    PhotoCamera as CameraIcon,
    Add as AddIcon,
    Remove as RemoveIcon
} from "@mui/icons-material";
import TvIcon from '@mui/icons-material/Tv';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

const ModeratorRequirements = () => {
    const [events, setEvents] = useState([]);
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [chairCount, setChairCount] = useState(0);
    const [tableCount, setTableCount] = useState(0);
    const [photoBoothCount, setPhotoBoothCount] = useState(0);
    const [groceryCount, setGroceryCount] = useState(0);
    const [ledCount, setLedCount] = useState(0);
    const [soundPairCount, setSoundPairCount] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState("");

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

    // Prices for each item
    const chairPrice = 5; // per piece
    const tablePrice = 10; // per piece
    const photoBoothPrice = 500; // per piece
    const groceryPrice = 250; // per set
    const ledPrice = 50; // per inch
    const soundPairPrice = 750; // per pair

    // Function to calculate total amount
    const calculateTotalAmount = () => {
        const chairAmount = chairCount * chairPrice;
        const tableAmount = tableCount * tablePrice;
        const photoBoothAmount = photoBoothCount * photoBoothPrice;
        const groceryAmount = groceryCount * groceryPrice;
        const ledAmount = ledCount * ledPrice;
        const soundPairAmount = soundPairCount * soundPairPrice;

        const totalAmount = chairAmount + tableAmount + photoBoothAmount + groceryAmount + ledAmount + soundPairAmount;
        return totalAmount;
    };

    return (
        <Box sx={{ width: '100%', padding: '10px' }}>
            <TitleAndSubheading title="Add Requirements"></TitleAndSubheading>
            

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
                                <ChairIcon sx={{ mr: 1 }} /> Chairs Needed
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setChairCount(Math.max(0, chairCount - 50))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{chairCount}</Typography>
                                <IconButton onClick={() => setChairCount(chairCount + 50)} color="primary">
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
                                <TableIcon sx={{ mr: 1 }} /> Tables Needed
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setTableCount(Math.max(0, tableCount - 10))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{tableCount}</Typography>
                                <IconButton onClick={() => setTableCount(tableCount + 10)} color="primary">
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
                                <CameraIcon sx={{ mr: 1 }} /> Photo Booths
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setPhotoBoothCount(Math.max(0, photoBoothCount - 1))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{photoBoothCount}</Typography>
                                <IconButton onClick={() => setPhotoBoothCount(photoBoothCount + 1)} color="primary">
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
                                <LocalGroceryStoreIcon sx={{ mr: 1 }} /> Grocery Set Needed
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setGroceryCount(Math.max(0, groceryCount - 1))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{groceryCount}</Typography>
                                <IconButton onClick={() => setGroceryCount(groceryCount + 1)} color="primary">
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
                                <TvIcon sx={{ mr: 1 }} /> Led Screen Inches
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                                <IconButton onClick={() => setLedCount(Math.max(16, ledCount - 3))} color="primary">
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="h5">{ledCount}</Typography>
                                <IconButton onClick={() => setLedCount(ledCount + 3)} color="primary">
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

export default ModeratorRequirements;