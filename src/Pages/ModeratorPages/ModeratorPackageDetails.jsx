import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Paper,
  Avatar,
  Divider,
  TextField,
  Stack,
  Button
} from '@mui/material';
import {
  CameraAlt,
  Restaurant,
  Videocam,
  Cake,
  LocationCity,
  RestaurantMenu,
  Chair,
  ShoppingCart,
  Light,
  Camera,
  Speaker,
  TableBar,
  AttachMoney,
  DirectionsCar,
  CalculateOutlined
} from '@mui/icons-material';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';

const ModeratorPackageDetails = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedIdEvent, setSelectedIdEvent] = useState('');
  const [loading, setLoading] = useState(true);
  const [additionalCosts, setAdditionalCosts] = useState('');
  const [transportationCosts, setTransportationCosts] = useState('');
  const [grandTotal, setGrandTotal] = useState(0);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // console.log(grandTotal);


  useEffect(() => {
    setLoading(true);
    axiosSecure.get(`/items`)
      .then((response) => {

        setEvents(response.data);
        if (response.data.length > 0) {

          setSelectedEvent(response.data[0].selectedPackageName);
          setSelectedIdEvent(response.data[0].selectedEvent);
        }
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axiosSecure, user?.email]);

  
  const handleClick = async () => {

    const payloadData = {
      grandTotal: grandTotal,
      additionalCosts: parseFloat(additionalCosts) || 0,
      transportationCosts: parseFloat(transportationCosts) || 0,
      event: "completed"

    };
    console.log(payloadData);
    try {
      const res = await axiosSecure.put(`/requiredItem/${selectedIdEvent}`, payloadData);
      console.log(res);


      if (res.data.result.modifiedCount) {
        const bookingData = {
          moderator: "completed"
        };
        const { data: update } = await axiosSecure.put(`/addOrganizer/${selectedIdEvent}`, bookingData);
        console.log("Update successful:", update);
        toast.success('Item Sent To Admin For Approve', { autoClose: 5000 })
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }

  };

  const selectedEventData = events.find(event => event.selectedPackageName === selectedEvent);

  const detailCards = [
    { icon: <CameraAlt />, label: 'Photographer Person', value: 'photografferPerson', color: '#2196F3' },
    { icon: <Restaurant />, label: 'Waiter Person', value: 'waiterPerson', color: '#2196F3' },
    { icon: <Videocam />, label: 'Videographer', value: 'vediographer', color: '#2196F3' },
    { icon: <Cake />, label: 'Cake Pound', value: 'cakePound', color: '#2196F3' },
    { icon: <LocationCity />, label: 'Clubs SF', value: 'clubsSF', color: '#2196F3' },
    { icon: <RestaurantMenu />, label: 'Catering Per Plate', value: 'cateringPerPlate', color: '#2196F3' },
    { icon: <Chair />, label: 'Chair Count', value: 'chairCount', color: '#2196F3' },
    { icon: <ShoppingCart />, label: 'Grocery Count', value: 'groceryCount', color: '#2196F3' },
    { icon: <Light />, label: 'LED Count', value: 'ledCount', color: '#2196F3' },
    { icon: <Camera />, label: 'Photo Booth Count', value: 'photoBoothCount', color: '#2196F3' },
    { icon: <Speaker />, label: 'Sound Pair Count', value: 'soundPairCount', color: '#2196F3' },
    { icon: <TableBar />, label: 'Table Count', value: 'tableCount', color: '#2196F3' },
  ];

  const calculateGrandTotal = (data) => {
    if (!data) return 0;
    const baseTotal = (data.ModeratorStaffTotalPrice || 0) + (data.ModeratorRequiredTotalPrice || 0);
    const additional = parseFloat(additionalCosts) || 0;
    const transportation = parseFloat(transportationCosts) || 0;
    return baseTotal + additional + transportation;
  };

  useEffect(() => {
    if (selectedEventData) {
      setGrandTotal(calculateGrandTotal(selectedEventData));
    }
  }, [selectedEventData, additionalCosts, transportationCosts]);

  if (loading) {
    return (
      <Container sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <TitleAndSubheading title="Event Package Details" />
          <FormControl
            sx={{
              minWidth: 300,
              mt: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': {
                  borderColor: '#2196F3',
                },
              }
            }}
          >
            <Select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              displayEmpty
              sx={{
                bgcolor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {events.map((event) => (
                <MenuItem key={event.selectedPackageName} value={event.selectedPackageName}>
                  {event.selectedPackageName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {selectedEventData && (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {detailCards.map((detail, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    elevation={2}
                    sx={{
                      height: '100%',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      },
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                    }}>
                      <Avatar
                        sx={{
                          bgcolor: detail.color,
                          width: 56,
                          height: 56,
                          mb: 2,
                        }}
                      >
                        {detail.icon}
                      </Avatar>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {detail.label}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: detail.color
                        }}
                      >
                        {selectedEventData[detail.value]}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 4 }} />


            <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
              <Grid item xs={12} md={6}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
                      Additional Costs
                    </Typography>
                    <Stack spacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#2196F3' }}>
                          <AttachMoney />
                        </Avatar>
                        <TextField
                          fullWidth
                          label="Additional Costs"
                          type="number"
                          value={additionalCosts}
                          onChange={(e) => setAdditionalCosts(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: '#2196F3' }}>
                          <DirectionsCar />
                        </Avatar>
                        <TextField
                          fullWidth
                          label="Transportation Costs"
                          type="number"
                          value={transportationCosts}
                          onChange={(e) => setTransportationCosts(e.target.value)}
                          variant="outlined"
                          InputProps={{
                            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                          }}
                        />
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>


              <Grid item xs={12} md={6}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    background: 'rgb(37,99,235)',
                    color: 'white',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'white',
                          width: 64,
                          height: 64,
                          mr: 3,
                        }}
                      >
                        <CalculateOutlined sx={{ color: '#2196F3', fontSize: 32 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Grand Total
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          ${grandTotal.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                    <Stack spacing={1} sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Base Amount:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          ${((selectedEventData?.ModeratorStaffTotalPrice || 0) +
                            (selectedEventData?.ModeratorRequiredTotalPrice || 0)).toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Additional Costs:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          ${(parseFloat(additionalCosts) || 0).toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Transportation:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          ${(parseFloat(transportationCosts) || 0).toLocaleString()}
                        </Typography>
                      </Box>

                    </Stack>

                  </CardContent>

                </Card>

              </Grid>


            </Grid>
            <Box>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleClick}
                fullWidth
              >
                Submit
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ModeratorPackageDetails;