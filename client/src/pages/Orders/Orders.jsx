import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../../components/Header';



const defaultTheme = createTheme();
const Orders = () => {


    const [orders, setOrders] = React.useState([]); 

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/add/orders'); 
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />
            <main className="contact-admin" >
                <Typography variant="h4" sx={{ textAlign: "center", margin: "auto", paddingTop: "15px" }} component="h2">
                <span style={{fontWeight: "700"}} >Information about customers</span>
                </Typography>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {orders.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', background: "rgb(30, 109, 71)" }}
                                >
                                    <CardContent sx={{ flexGrow: 1, color: "#fff" }}>
                                        <Typography gutterBottom variant="h6" component="h2">
                                        <span style={{fontWeight: "600"}} >First name:</span> {card.firstName}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h2">
                                        <span style={{fontWeight: "600"}} >Last name:</span>  {card.lastName}
                                        </Typography>
                                        <Typography>
                                        <span style={{fontWeight: "700"}} >Address:</span> {card.addressLine}
                                        </Typography>
                                        <Typography>
                                        <span style={{fontWeight: "700"}} >City:</span> {card.city}
                                        </Typography>
                                        <Typography>
                                        <span style={{fontWeight: "700"}} >Zip code:</span>  {card.zipCode}
                                        </Typography>
                                        <Typography>
                                        <span style={{fontWeight: "700"}} >Country:</span>  {card.country}
                                        </Typography>
                                        <Typography>
                                        <span style={{fontWeight: "700"}} >Name card:</span>  {card.nameCard}
                                        </Typography>
                                        <Typography>
                                        <span style={{fontWeight: "700"}} >Number card:</span>  {card.numberCard}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    )
}

export default Orders