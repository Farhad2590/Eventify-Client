import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { FaMoneyBillWave, FaWallet, FaChartLine } from 'react-icons/fa';
import useConfirmedEvents from '../../hooks/useConfirmedEvents';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import TitleAndSubheading from '../../Shared/TitleAndSubheading';

const AdminBudgetSection = () => {
    const axiosSecure = useAxiosSecure();
    const [finishedEvent, setFinishedEvent] = useState([]);
    const [confirmedEvents] = useConfirmedEvents();

    useEffect(() => {
        axiosSecure.get(`/confirmedItems`)
            .then(res => {
                setFinishedEvent(res?.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [axiosSecure]);

    // Process data for profit/loss analysis
    const profitLossData = confirmedEvents?.map(event => {
        const matchingFinished = finishedEvent?.find(
            finished => finished.selectedEvent === event._id
        );

        return {
            packageName: event.package_name,
            category: event.category,
            totalPrice: event.totalPrice,
            grandTotal: matchingFinished ? matchingFinished.grandTotal : 0,
            profit: matchingFinished ? event.totalPrice - matchingFinished.grandTotal : 0
        };
    });

    // Event category distribution data
    const categories = ['Wedding', 'Concert', 'Birthdays', 'Festival', 'Newyear', 'Conference'];
    const categoryData = categories?.map(category => ({
        name: category,
        value: confirmedEvents?.filter(event => event.category === category).length
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    // Calculate totals for summary cards
    const totalRevenue = confirmedEvents?.reduce((sum, event) => sum + event.totalPrice, 0);
    const totalCosts = finishedEvent?.reduce((sum, event) => sum + event.grandTotal, 0);
    const totalProfit = totalRevenue - totalCosts;

    // Custom tooltip for the bar chart
    const CustomBarTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <Card sx={{ p: 1, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
                    <Typography variant="subtitle2">{payload[0].payload.packageName}</Typography>
                    <Typography color="textSecondary" variant="body2">
                        Category: {payload[0].payload.category}
                    </Typography>
                    {payload?.map((entry, index) => (
                        <Typography key={index} style={{ color: entry.color }}>
                            {entry.name}: ${entry.value?.toLocaleString()}
                        </Typography>
                    ))}
                </Card>
            );
        }
        return null;
    };

    return (
        <Box sx={{ p: 3 }}>
            <Card elevation={3}>
                <CardContent>
                    <TitleAndSubheading title=" Budget Analysis Dashboard"></TitleAndSubheading>

                    <Grid container spacing={3}>
                        {/* Summary Cards at the top */}
                        <Grid item xs={12}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ bgcolor: '#f3f4f6' }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <FaMoneyBillWave size={24} color="#1976d2" />
                                                <Box>
                                                    <Typography variant="h4">
                                                        ${totalRevenue?.toLocaleString()}
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                        Total Revenue
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Card sx={{ bgcolor: '#f3f4f6' }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <FaWallet size={24} color="#2e7d32" />
                                                <Box>
                                                    <Typography variant="h4">
                                                        ${totalCosts?.toLocaleString()}
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                        Total Costs
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Card sx={{ bgcolor: '#f3f4f6' }}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <FaChartLine size={24} color={totalProfit >= 0 ? "#2e7d32" : "#d32f2f"} />
                                                <Box>
                                                    <Typography variant="h4" color={totalProfit >= 0 ? "success.main" : "error.main"}>
                                                        ${Math.abs(totalProfit)?.toLocaleString()}
                                                    </Typography>
                                                    <Typography color="textSecondary">
                                                        Total {totalProfit >= 0 ? 'Profit' : 'Loss'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Profit/Loss Chart */}
                        <Grid item xs={12} lg={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Profit/Loss Analysis by Package
                                    </Typography>
                                    <Box sx={{ width: '100%', height: 300, overflowX: 'auto' }}>
                                        <BarChart
                                            width={500}
                                            height={300}
                                            data={profitLossData}
                                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="packageName" />
                                            <YAxis />
                                            <Tooltip content={<CustomBarTooltip />} />
                                            <Legend />
                                            <Bar dataKey="totalPrice" fill="#8884d8" name="Total Price" />
                                            <Bar dataKey="grandTotal" fill="#82ca9d" name="Grand Total" />
                                            <Bar dataKey="profit" fill="#ffc658" name="Profit" />
                                        </BarChart>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Event Category Distribution */}
                        <Grid item xs={12} lg={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Event Category Distribution
                                    </Typography>
                                    <Box sx={{ width: '100%', height: 300, overflowX: 'auto' }}>
                                        <PieChart width={500} height={300}>
                                            <Pie
                                                data={categoryData.filter(item => item.value > 0)} // Only show categories with events
                                                cx={250}
                                                cy={150}
                                                labelLine={true}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {categoryData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AdminBudgetSection;