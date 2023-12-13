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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmail, updateIsAuth, updateUserRole } from '../../store/reducers/FilterSlice';
import backgroundImage from "../../assets/image/back.jpg"
import { jwtDecode } from 'jwt-decode';

const defaultTheme = createTheme();

const LoginPage = () => {

    const { email } = useSelector((state) => state.FilterReducer);
    const dispatch = useDispatch()


    const [password, setPassword] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [formValid, setFormValid] = useState(false)

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
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(`login ${result}`)
                localStorage.setItem('token', result.token);
                const decodedToken = jwtDecode(result.token);
                const userRole = decodedToken.roles[0];

                dispatch(updateUserRole(userRole));
                dispatch(updateIsAuth(true))
                push('/');
            } else {
                if (response.status === 400) {
                    alert('Неправильний пароль');
                }
            }
        } catch (error) {
            console.error('Помилка при відправленні запиту:', error);
        }
    };

    return (
        <div style={{
            height: "100vh",
            backgroundImage: `linear-gradient(to right, rgba(26, 33, 27, 0.567) 100%, rgba(26, 33, 27, 0.567) 100%), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}>
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
                        <Typography component="h1" variant="h5" style={{ color: "#fff" }}>
                            Login
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                color={emailDirty ? 'error' : 'primary'}
                                value={email}
                                onChange={e => emailHandler(e)}
                            />
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
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                color={passwordDirty ? 'error' : 'primary'}
                                value={password}
                                onChange={e => passwordHandler(e)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" style={{ color: "white" }} />}
                                label="Remember me"
                                style={{ color: "white" }}
                            />
                            <Button
                                type="submit"
                                fullWidth

                                sx={{ mt: 3, mb: 2, backgroundColor: "inherit", border: "1px solid white", color: "#fff" }}


                            >
                                Sign in
                            </Button>
                            <Grid container>

                                <Grid item>
                                    <Link style={{ color: "white" }} href="/registration" variant="body2">
                                        {"Don't have an account? Registration"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div >
    )
}

export default LoginPage