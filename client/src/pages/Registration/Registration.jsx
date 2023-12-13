import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail, updateIsAuth } from '../../store/reducers/FilterSlice';
import backgroundImage from "../../assets/image/back.jpg"


const defaultTheme = createTheme();


const RegisterPage = () => {

    const { email } = useSelector((state) => state.FilterReducer);

    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [formValid, setFormValid] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (emailDirty || passwordDirty) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailDirty, passwordDirty])

    const emailHandler = (e) => {
        dispatch(updateEmail(e.target.value));
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

        if (!re.test(String(email).toLowerCase())) {
            setEmailDirty(true)
        } else {
            setEmailDirty(false)
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 24) {
            setPasswordDirty(true)
        } else {
            setPasswordDirty(false)
        }
    }



    const push = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            username: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:5000/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result)
                localStorage.setItem('token', result.token);
                dispatch(updateIsAuth(true))
                push('/');
            } else {
                console.error('Помилка реєстрації:', response.status);
                alert('Помилка реєстрації. Перевірте введені дані.');
            }
        } catch (error) {
            console.error('Помилка при відправленні запиту:', error);
        }
    };


    return (
        <div
            style={{
                height: "100vh",
                backgroundImage: `linear-gradient(to right, rgba(26, 33, 27, 0.567) 100%, rgba(26, 33, 27, 0.567) 100%), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }}
        >
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', marginTop: "100px" }}>
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{ color: "white" }}>
                            Registration
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            style: { color: 'white' },
                                        }}
                                        InputProps={{
                                            sx: {
                                                color: 'white',
                                                "& fieldset": { borderColor: "white" },
                                                "&:hover fieldset": { borderColor: "white" },
                                                "&.Mui-focused fieldset": { borderColor: "white" },
                                            },
                                        }}
                                        style={{ color: "white" }}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email adress"
                                        name="email"
                                        autoComplete="email"
                                        color={emailDirty ? 'error' : 'primary'}
                                        value={email}
                                        onChange={e => emailHandler(e)}


                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        InputLabelProps={{
                                            style: { color: 'white' },
                                        }}
                                        InputProps={{
                                            sx: {
                                                color: 'white',
                                                "& fieldset": { borderColor: "white" },
                                                "&:hover fieldset": { borderColor: "white" },
                                                "&.Mui-focused fieldset": { borderColor: "white" },
                                            },
                                        }}
                                        style={{ color: "white" }}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        color={passwordDirty ? 'error' : 'primary'}
                                        value={password}
                                        onChange={e => passwordHandler(e)}

                                    />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2, backgroundColor: "inherit", border: "1px solid white", color: "white" }}
                            >
                                Registration
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link style={{ color: "white" }} href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    )
}

export default RegisterPage