import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Grid,
    Paper,
    IconButton
} from "@mui/material";
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Chair as ChairIcon,
    TableBar as TableIcon,
    PhotoCamera as CameraIcon,
    Tv as TvIcon,
    LocalGroceryStore as GroceryIcon,
    RecordVoiceOver as SoundIcon,
    AttachMoney
} from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";

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
    const [selectedPackageName, setSelectedPackageName] = useState('');

    const requirements = [
        {
            icon: ChairIcon,
            label: "Chairs",
            value: chairCount,
            setValue: setChairCount,
            step: 5,
            price: 5,
            color: "#1976d2",
            bgColor: "#e3f2fd"
        },
        {
            icon: TableIcon,
            label: "Tables",
            value: tableCount,
            setValue: setTableCount,
            step: 1,
            price: 10,
            color: "#1976d2",
            bgColor: "#e3f2fd"
        },
        {
            icon: CameraIcon,
            label: "Photo Booths",
            value: photoBoothCount,
            setValue: setPhotoBoothCount,
            step: 1,
            price: 500,
            color: "#1976d2",
            bgColor: "#e3f2fd"
        },
        {
            icon: GroceryIcon,
            label: "Groceries",
            value: groceryCount,
            setValue: setGroceryCount,
            step: 10,
            price: 250,
            color: "#1976d2",
            bgColor: "#e3f2fd"
        },
        {
            icon: TvIcon,
            label: "LED Screens",
            value: ledCount,
            setValue: setLedCount,
            step: 1,
            price: 50,
            color: "#1976d2",
            bgColor: "#e3f2fd"
        },
        {
            icon: SoundIcon,
            label: "Sound Pairs",
            value: soundPairCount,
            setValue: setSoundPairCount,
            step: 1,
            price: 750,
            color: "#1976d2",
            bgColor: "#e3f2fd"
        }
    ];

    useEffect(() => {
        axiosSecure
            .get(`/eventConfirmed`)
            .then((response) => {
                const filteredEvents = response.data.filter(
                    (event) =>
                        event.event_organizer === user?.email &&
                        event.moderator === "assigned" &&
                        event.requirements !== "Requirements_Added"
                );
                setEvents(filteredEvents);
                if (filteredEvents.length > 0) {
                    setSelectedEvent(filteredEvents[0]._id);
                    setSelectedPackageName(filteredEvents[0].package_name);
                }
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    }, [axiosSecure, user?.email]);

    const handleEventSelect = (eventId) => {
        const selectedEventObj = events.find(event => event._id === eventId);
        setSelectedEvent(eventId);
        setSelectedPackageName(selectedEventObj ? selectedEventObj.package_name : '');
    };

    const calculateTotalAmount = () => {
        return requirements.reduce((total, item) => total + item.value * item.price, 0);
    };

    const handleSubmit = async () => {
        const ModeratorRequiredTotalPrice = calculateTotalAmount();
        const requiredData = {
            // selectedPackageName,
            chairCount,
            tableCount,
            photoBoothCount,
            groceryCount,
            ledCount,
            soundPairCount,
            ModeratorRequiredTotalPrice
        };

        try {
            const res = await axiosSecure.put(`/requiredItem/${selectedEvent}`, requiredData);
            console.log(res);
            

            if (res.data.result.modifiedCount) {
                console.log(res);
                
                const bookingData = { requirements: "Requirements_Added" };
                await axiosSecure.put(`/addOrganizer/${selectedEvent}`, bookingData);
                toast.success('Item Sent To Admin For Approve', { autoClose: 5000 })
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Title Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <TitleAndSubheading title="Moderator Requirements" />
            </Box>

            {/* Event Selection and Total Amount */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                    <FormControl fullWidth>
                        <InputLabel>Select Event</InputLabel>
                        <Select
                            value={selectedEvent}
                            label="Select Event"
                            onChange={(e) => handleEventSelect(e.target.value)}
                        >
                            {events.map((event) => (
                                <MenuItem key={event._id} value={event._id}>
                                    {event.package_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ background: 'rgb(37,99,235)', color: 'white', height: '100%' }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Paper elevation={0} sx={{ p: 2, borderRadius: '50%', bgcolor: 'white', mr: 2 }}>
                                    <AttachMoney sx={{ color: 'rgb(37,99,235)' }} />
                                </Paper>
                                <Box>
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        Total Amount
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        ৳{calculateTotalAmount()}
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Requirements Grid */}
            <Grid container spacing={3}>
                {requirements.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card elevation={2} sx={{ transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 } }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Paper elevation={0} sx={{ p: 2, borderRadius: '50%', bgcolor: item.bgColor, mr: 2 }}>
                                        <item.icon sx={{ color: item.color, fontSize: 32 }} />
                                    </Paper>
                                    <Box>
                                        <Typography color="text.secondary" variant="body2">
                                            {item.label}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ৳{item.price} each
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <IconButton onClick={() => item.setValue(Math.max(0, item.value - item.step))} sx={{ bgcolor: item.bgColor, '&:hover': { bgcolor: item.bgColor } }}>
                                        <RemoveIcon sx={{ color: item.color }} />
                                    </IconButton>
                                    <Typography variant="h5" sx={{ fontWeight: 'medium' }}>{item.value}</Typography>
                                    <IconButton onClick={() => item.setValue(item.value + item.step)} sx={{ bgcolor: item.bgColor, '&:hover': { bgcolor: item.bgColor } }}>
                                        <AddIcon sx={{ color: item.color }} />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Submit Button */}
            <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 4, py: 2, background: 'rgb(37,99,235)', '&:hover': { background: 'rgb(37,99,235)' } }}
                onClick={handleSubmit}
            >
                Submit Requirements
            </Button>
        </Container>
    );
};

export default ModeratorRequirements;
