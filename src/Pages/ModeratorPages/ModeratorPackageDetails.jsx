import React from 'react';
import { 
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Container,
  Divider
} from '@mui/material';
import { 
  PhotoCamera as PhotoCameraIcon, 
  ShoppingBag as ShoppingBagIcon, 
  Tv as TvIcon, 
  MusicNote as MusicNoteIcon, 
  TableBar as TableBarIcon, 
  People as PeopleIcon, 
  Restaurant as RestaurantIcon, 
  Videocam as VideocamIcon,
  Cake as CakeIcon, 
  AttachMoney as AttachMoneyIcon, 
  LocationCity as LocationCityIcon,
  EventSeat as EventSeatIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';

const ModeratorPackageDetails = () => {
  const items = [
    {
      icon: InventoryIcon,
      label: "Package Name",
      value: "Ultimate New Year Package",
      category: "General",
      color: "#9c27b0",
      bgColor: "#f3e5f5"
    },
    {
      icon: PeopleIcon,
      label: "Photographers",
      value: "5 persons",
      category: "Staff",
      color: "#1976d2",
      bgColor: "#e3f2fd"
    },
    {
      icon: PeopleIcon,
      label: "Waiters",
      value: "5 persons",
      category: "Staff",
      color: "#1976d2",
      bgColor: "#e3f2fd"
    },
    {
      icon: VideocamIcon,
      label: "Videographer",
      value: "1 person",
      category: "Staff",
      color: "#d81b60",
      bgColor: "#fce4ec"
    },
    {
      icon: EventSeatIcon,
      label: "Chairs",
      value: "50 pieces",
      category: "Equipment",
      color: "#2e7d32",
      bgColor: "#e8f5e9"
    },
    {
      icon: TableBarIcon,
      label: "Tables",
      value: "10 pieces",
      category: "Equipment",
      color: "#2e7d32",
      bgColor: "#e8f5e9"
    },
    {
      icon: PhotoCameraIcon,
      label: "Photo Booth",
      value: "1 unit",
      category: "Equipment",
      color: "#d81b60",
      bgColor: "#fce4ec"
    },
    {
      icon: ShoppingBagIcon,
      label: "Grocery",
      value: "1 set",
      category: "Supplies",
      color: "#ed6c02",
      bgColor: "#fff3e0"
    },
    {
      icon: TvIcon,
      label: "LED Screens",
      value: "3 units",
      category: "Equipment",
      color: "#d32f2f",
      bgColor: "#ffebee"
    },
    {
      icon: MusicNoteIcon,
      label: "Sound Pairs",
      value: "1 pair",
      category: "Equipment",
      color: "#3949ab",
      bgColor: "#e8eaf6"
    },
    {
      icon: CakeIcon,
      label: "Cake",
      value: "4 pounds",
      category: "Food",
      color: "#c2185b",
      bgColor: "#fce4ec"
    },
    {
      icon: LocationCityIcon,
      label: "Club Space Fee",
      value: "$2,100",
      category: "Venue",
      color: "#0288d1",
      bgColor: "#e1f5fe"
    },
    {
      icon: RestaurantIcon,
      label: "Catering per Plate",
      value: "$100",
      category: "Food",
      color: "#00796b",
      bgColor: "#e0f2f1"
    }
  ];

  const categories = [...new Set(items.map(item => item.category))];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" 
          sx={{ 
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 2
          }}
        >
          Event Package Details
        </Typography>
        <Divider sx={{ 
          width: '100px', 
          margin: 'auto',
          borderWidth: 2,
          borderColor: 'primary.main'
        }} />
      </Box>
      {categories.map(category => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium' }}>
            {category}
          </Typography>
          <Grid container spacing={3}>
            {items
              .filter(item => item.category === category)
              .map((item, index) => (
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
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: '50%',
                            bgcolor: item.bgColor,
                            mr: 2
                          }}
                        >
                          <item.icon sx={{ 
                            color: item.color,
                            fontSize: 32
                          }} />
                        </Paper>
                        <Box>
                          <Typography color="text.secondary" variant="body2">
                            {item.label}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                            {item.value}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Box>
      ))}
      <Card 
        elevation={3}
        sx={{
          mt: 4,
          background: 'linear-gradient(45deg, #9c27b0 30%, #d81b60 90%)',
          color: 'white'
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '50%',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                mr: 2
              }}
            >
              <AttachMoneyIcon sx={{ 
                color: 'white',
                fontSize: 32
              }} />
            </Paper>
            <Box>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Moderator Required Total Price
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                ${2000}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ModeratorPackageDetails;