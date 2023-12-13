import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { updateCvv, updateExpiryData, updateNameCard, updateNumberCard } from '../../store/reducers/FilterSlice';

export default function PaymentForm() {

    const dispatch = useDispatch()
    const {nameCard, numberCard, expiryData, cvv} = useSelector((state) => state.FilterReducer);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={nameCard}
            onChange={(e) => dispatch(updateNameCard(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={numberCard}
            onChange={(e) => dispatch(updateNumberCard(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={expiryData}
            onChange={(e) => dispatch(updateExpiryData(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={cvv}
            onChange={(e) => dispatch(updateCvv(e.target.value))}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}