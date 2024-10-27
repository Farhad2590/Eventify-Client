import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Avatar,
  IconButton,
  TextField,
  Button,
  Typography,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { CameraAlt } from '@mui/icons-material';
import TitleAndSubheading from './TitleAndSubheading';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';

const ProfileSettings = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [userData, isUserLoading] = useUser();
  const { user } = useAuth();

  if (isUserLoading) {
    return <Typography variant="h6">Loading...</Typography>; 
  }

  if (!userData) {
    return <Typography variant="h6">No user data available</Typography>; 
  }

  const [firstName, lastName] = userData.name ? userData.name.split(' ') : ["", ""];

  return (
    <Box minHeight="100vh" bgcolor="#f9fafb" p={isSmallScreen ? 2 : 3}>
      <TitleAndSubheading title="Profile" />

      <Grid container spacing={isSmallScreen ? 2 : 4} justifyContent="center">
        
        <Grid item xs={12} md={6}>
          <Card>
            <Box position="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/7vXPB2c/pic4.jpg"}
                alt="Profile"
                style={{ width: '100%', height: 'auto' }}
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bgcolor="rgba(0, 0, 0, 0.5)"
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={<Typography variant="h6">Change Your Profile</Typography>} />
            <CardContent>
              <Grid container spacing={2} direction="column">
                
                <Grid item>
                  <Box position="relative" width="128px" height="128px" mx="auto">
                    <Avatar
                      src={user.photoURL || "https://i.ibb.co/7vXPB2c/pic4.jpg"}
                      alt="Profile"
                      style={{ width: '100%', height: '100%' }}
                    />
                    <IconButton
                      style={{
                        position: 'absolute',
                        bottom: '-10px',
                        right: '-10px',
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                      size="small"
                    >
                      <CameraAlt style={{ fontSize: '16px', color: 'gray' }} />
                    </IconButton>
                  </Box>
                </Grid>

                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      defaultValue={firstName}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      defaultValue={lastName}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <TextField
                    label="Email"
                    defaultValue={userData.email}
                    type="email"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid item container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Country"
                      defaultValue=""
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="City"
                      defaultValue=""
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default ProfileSettings;
