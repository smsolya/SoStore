import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentFrom';
import AddressForm from './AddressForm';
import Review from './Review';
import backgroundImage from "../../assets/image/back.jpg"
import { useSelector } from 'react-redux';


const steps = ['Shipping address', 'Payment details', 'Review your order'];


function getRandomNumber() {
    return Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
  }
  
  let randomValue = getRandomNumber();


export default function Checkout({ cartItems, setCartItems}) {
    const [activeStep, setActiveStep] = useState(0);

    const {
        firstName,
        lastName,
        addressLine,
        city,
        zipCode,
        country,
        nameCard,
        numberCard,
    } = useSelector((state) => state.FilterReducer);

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm />;
            case 1:
                return <PaymentForm />;
            case 2:
                return <Review cartItems={cartItems}  />;
            default:
                throw new Error('Unknown step');
        }
    }

    const sendUserDataToServer = async () => {
        try {
          const userData = {
            firstName,
            lastName,
            addressLine,
            city,
            zipCode,
            country,
            nameCard,
            numberCard,
          };
    
          const serverURL = 'http://localhost:5000/add/orders';
    
          const response = await fetch(serverURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
    
          if (response.ok) {
            console.log('User data sent successfully!');
          } else {
            console.error('Failed to send user data to the server.');
          }
        } catch (error) {
          console.error('Error sending user data to the server:', error);
        }
      };
    
      const handleNext = () => {
        setActiveStep(activeStep + 1);
    
        if (activeStep === steps.length - 1) {
          sendUserDataToServer();
        }
      };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const navigate = useNavigate();

    const handleMain = () => {
        navigate("/cart")
    };
    return (
        <div style={{
            paddingTop: "80px",
            height: "100vh",
            backgroundImage: `linear-gradient(to right, rgba(26, 33, 27, 0.567) 100%, rgba(26, 33, 27, 0.567) 100%), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}>
            <CssBaseline />
            <Container component="main" maxWidth="sm"  >
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 1, pb: 1 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is {randomValue}. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                            <Button style={{ marginLeft: "150px" }} onClick={() => { navigate("/"); setCartItems([]); localStorage.removeItem("cartItems"); }}> Continue </Button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(
                                activeStep,
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                 {activeStep == 0 && (
                                    <Button onClick={handleMain} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </div>
    );
}