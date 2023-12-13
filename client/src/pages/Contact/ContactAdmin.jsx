import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Contact.css';
import { useState } from 'react';
import { useEffect } from 'react';
import MessageIcon from '@mui/icons-material/Message';
import Header from '../../components/Header';



const defaultTheme = createTheme();

export default function ContactAdmin() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:5000/contacts/get');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setContacts(data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);
    return (
        <ThemeProvider theme={defaultTheme}>
            <Header />
            <main className="contact-admin" >
                <Typography variant="h4" sx={{ textAlign: "center", margin: "auto", paddingTop: "15px" }} component="h2">
                    Customer messages
                </Typography>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {contacts.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.email}
                                        </Typography>
                                        <Typography>
                                            {card.message}
                                        </Typography>
                                        <Button style={{ marginTop: "10px", backgroundColor: "rgb(30, 109, 71)" }} variant="contained">
                                            <a style={{ textDecoration: "none", color: "#fff" }} href={`mailto:${card.email}`}>Answer</a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}