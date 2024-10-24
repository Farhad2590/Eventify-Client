
import useAxiosSecure from "../../hooks/useAxiosSecure";
import TitleAndSubheading from "../../Shared/TitleAndSubheading";
import useIndividualModeratorEvents from "../../hooks/useIndividualModeratorEvents";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Avatar,
    Box
} from '@mui/material';

const ModeartorEventstatus = () => {
    const axiosSecure = useAxiosSecure();
    const [filteredEvents, refetch] = useIndividualModeratorEvents()


    const handleSave = async (id) => {
        console.log(id);

        try {
            const bookingData = {
                event_organizer: "",
                moderator: ""
            };
            const { data: update } = await axiosSecure.put(`/addOrganizer/${id}`, bookingData);
            console.log("Update successful:", update);
            refetch();
        } catch (err) {
            console.log("Error updating:", err.message);
        }
    };
    const handleAccept = async (id) => {
        console.log(id);

        try {
            const bookingData = {
                moderator: "assigned"
            };
            const { data: update } = await axiosSecure.put(`/addOrganizer/${id}`, bookingData);
            console.log("Update successful:", update);
            refetch();
        } catch (err) {
            console.log("Error updating:", err.message);
        }
    };

    return (
        <Container maxWidth="lg">
            <Paper
                elevation={3}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
                    mb: 4
                }}
            >
                
                <TitleAndSubheading title="Events Suggested and Completed"></TitleAndSubheading>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                {["Name & Category", "User Info", "Event Info", "Status", "Delete"].map((head) => (
                                    <TableCell
                                        key={head}
                                        sx={{
                                            backgroundColor: 'action.hover',
                                            fontWeight: 'medium',
                                            '&:hover': {
                                                backgroundColor: 'action.selected'
                                            }
                                        }}
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEvents?.map((project, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <Box>
                                            <Typography variant="body2">
                                                {project.package_name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Category: {project.category}
                                            </Typography>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                src={project.user_Photo}
                                                alt={project.user_Name}
                                                sx={{ width: 36, height: 36 }}
                                            />
                                            <Box>
                                                <Typography variant="body2">
                                                    {project.user_Name}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {project.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        <Box>
                                            <Typography variant="body2">
                                                Duration: {project.duration_hours} hours
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" display="block">
                                                Price: ${project.price}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                Event date: {new Date(project.date).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </TableCell>

                                    <TableCell>
                                        {project.moderator === "" ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleAccept(project._id)}
                                            >
                                                Accept Event
                                            </Button>
                                        ) : (
                                            <Typography variant="body2">
                                                {project.moderator}
                                            </Typography>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#A91101', // Similar red tone to your primary color
                                                color: 'white', // White text for contrast
                                                '&:hover': {
                                                    backgroundColor: 'rgb(200, 30, 50)', // Slightly darker red on hover
                                                },
                                                borderRadius: '8px', // Optional: custom rounded corners
                                                padding: '6px 12px', // Optional: custom padding
                                            }}
                                            size="small"
                                            onClick={() => handleSave(project._id)}
                                        >
                                            Ignore Event
                                        </Button>


                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
};

export default ModeartorEventstatus;