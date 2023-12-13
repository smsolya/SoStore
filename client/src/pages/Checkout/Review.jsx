import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';

const Review = ({ cartItems }) => {
    const {
        firstName,
        lastName,
        addressLine,
        city,
        state,
        zipCode,
        country,
        nameCard,
        numberCard,
        expiryData,
    } = useSelector((state) => state.FilterReducer);

    const addresses = [addressLine, city, state, zipCode, country];

    const payments = [
        { name: 'Card type', detail: nameCard },
        { name: 'Cardholder', detail: `Mrs ${lastName}` },
        { name: 'Card number', detail: numberCard },
        { name: 'Validity', detail: expiryData },
    ];

    const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

    return (
        <React.Fragment>
            <div>
                <Typography variant="h6" gutterBottom>
                    Total amount
                </Typography>

                <List disablePadding>
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="In general" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                            ${totalAmount.toFixed(2)}
                        </Typography>
                    </ListItem>
                </List>

                <Typography variant="h6" gutterBottom >
                    Products in the card
                </Typography>
                <List disablePadding
                    style={{
                        maxHeight: "100px",
                        overflowY: 'scroll',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'transparent transparent',
                    }}
                >
                    {cartItems.map(({ id, name, type, image, price, quantity }) => (
                        quantity !== 0 && (
                            <ListItem key={id} sx={{ py: 1, px: 0 }}>
                                <ListItemText primary={`${name} x${quantity}`} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    ${price}
                                </Typography>
                            </ListItem>
                        )
                    ))}
                </List>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Delivery
                        </Typography>
                        <Typography gutterBottom>{firstName} {lastName}</Typography>
                        <Typography gutterBottom>{addresses.join(', ')}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Payment details
                        </Typography>
                        <Grid container>
                            {payments.map((payment) => (
                                <React.Fragment key={payment.name}>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.detail}</Typography>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default Review;
