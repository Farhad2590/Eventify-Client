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
  IconButton,
  Divider
} from "@mui/material";
import {
  AddAPhoto,
  CenterFocusStrong,
  Flatware,
  Cake,
  Groups2,
  RestaurantMenu,
  Add as AddIcon,
  Remove as RemoveIcon,
  AttachMoney
} from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";

const ModeratorStaffs = () => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [photografferPerson, setPhotografferPerson] = useState(0);
  const [waiterPerson, setWaiterPerson] = useState(0);
  const [vediographer, setVediographer] = useState(0);
  const [cakePound, setcakePound] = useState(0);
  const [clubsSF, setClubsSF] = useState(0);
  const [cateringPerPlate, setcateringPerPlate] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedPackageName, setSelectedPackageName] = useState('');

  const staffItems = [
    {
      icon: AddAPhoto,
      label: "Photographer Staff",
      value: photografferPerson,
      setValue: setPhotografferPerson,
      step: 1,
      color: "#1976d2",
      bgColor: "#e3f2fd",
      price: 1000
    },
    {
      icon: Flatware,
      label: "Waiter Staff",
      value: waiterPerson,
      setValue: setWaiterPerson,
      step: 5,
      color: "#2e7d32",
      bgColor: "#e8f5e9",
      price: 200
    },
    {
      icon: CenterFocusStrong,
      label: "Videographer Staff",
      value: vediographer,
      setValue: setVediographer,
      step: 1,
      color: "#d81b60",
      bgColor: "#fce4ec",
      price: 1500
    },
    {
      icon: Cake,
      label: "Birthday Cake (Pounds)",
      value: cakePound,
      setValue: setcakePound,
      step: 1,
      color: "#c2185b",
      bgColor: "#fce4ec",
      price: 300
    },
    {
      icon: Groups2,
      label: "Club Space (sq ft)",
      value: clubsSF,
      setValue: setClubsSF,
      step: 1050,
      color: "#0288d1",
      bgColor: "#e1f5fe",
      price: 20
    },
    {
      icon: RestaurantMenu,
      label: "Catering Per Plate",
      value: cateringPerPlate,
      setValue: setcateringPerPlate,
      step: 50,
      color: "#00796b",
      bgColor: "#e0f2f1",
      price: 150
    }
  ];

  const calculateTotalAmount = () => {
    return staffItems.reduce((total, item) => total + (item.value * item.price), 0);
  };

  const handleEventSelect = (eventId) => {
    const selectedEventObj = events.find(event => event._id === eventId);
    setSelectedEvent(eventId);
    setSelectedPackageName(selectedEventObj ? selectedEventObj.package_name : '');
  };

  useEffect(() => {
    axiosSecure
      .get(`/eventConfirmed`)
      .then((response) => {
        const filteredEvents = response.data.filter(
          (event) => event.event_organizer === user?.email &&
            event.moderator === "assigned" &&
            event.staff !== "Staff_Added"
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

  const handleSubmit = async () => {
    const ModeratorRequiredTotalPrice = calculateTotalAmount();
    const confirmedStaffData = {
      selectedPackageName,
      photografferPerson,
      waiterPerson,
      vediographer,
      cakePound,
      clubsSF,
      cateringPerPlate,
      ModeratorRequiredTotalPrice,
      selectedEvent
    };

    try {
      const res = await axiosSecure.post('/requiredItems', confirmedStaffData);
      if (res.data.insertedId) {
        const bookingData = { staff: "Staff_Added" };
        await axiosSecure.put(`/addOrganizer/${selectedEvent}`, bookingData);
        toast.success('Item Sent To Admin For Approve', { autoClose: 5000 });
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
        <TitleAndSubheading title="Staff Requirements"></TitleAndSubheading>
        {/* <Divider sx={{ 
          width: '100px', 
          margin: 'auto',
          borderWidth: 2,
          borderColor: 'primary.main'
        }} /> */}
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
          <Card 
            sx={{
              background: 'rgb(37,99,235)',
              color: 'white',
              height: '100%'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: 'white',
                    mr: 2
                  }}
                >
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

      {/* Staff Items Grid */}
      <Grid container spacing={3}>
        {staffItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={2}
              sx={{
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: item.bgColor,
                      mr: 2
                    }}
                  >
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
                  <IconButton 
                    onClick={() => item.setValue(Math.max(0, item.value - item.step))}
                    sx={{ bgcolor: item.bgColor, '&:hover': { bgcolor: item.bgColor } }}
                  >
                    <RemoveIcon sx={{ color: item.color }} />
                  </IconButton>
                  <Typography variant="h5" sx={{ fontWeight: 'medium' }}>
                    {item.value}
                  </Typography>
                  <IconButton 
                    onClick={() => item.setValue(item.value + item.step)}
                    sx={{ bgcolor: item.bgColor, '&:hover': { bgcolor: item.bgColor } }}
                  >
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
        sx={{ 
          mt: 4,
          py: 2,
          background: 'rgb(37,99,235)',
          '&:hover': {
            background: 'rgb(37,99,235)'
          }
        }}
        onClick={handleSubmit}
      >
        Submit Requirements
      </Button>
    </Container>
  );
};

export default ModeratorStaffs;