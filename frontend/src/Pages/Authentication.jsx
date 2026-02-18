import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/contexts.jsx';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');

    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            }

            if (formState === 1) {
                const result = await handleRegister(name, username, password);
                setUsername('');
                setMessage(result || 'Registration successful');
                setOpen(true);
                setError('');
                setFormState(0);
                setPassword('');
                setName('');
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.message || 'Something went wrong';
            setError(errorMessage);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                    backgroundImage: "url('/background.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                        color: '#fff',
                        fontWeight: 700,
                        letterSpacing: 1,
                        mb: 2,
                        textAlign: 'center',
                        textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                    }}
                >
                    Meet Up
                </Typography>
                <Paper
                    elevation={10}
                    sx={{
                        width: '100%',
                        maxWidth: 440,
                        p: 4,
                        borderRadius: 3,
                        backdropFilter: 'blur(2px)',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                            {formState === 0 ? 'Sign In' : 'Sign Up'}
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <Button variant={formState === 0 ? 'contained' : 'text'} onClick={() => setFormState(0)}>
                                Sign In
                            </Button>
                            <Button variant={formState === 1 ? 'contained' : 'text'} onClick={() => setFormState(1)}>
                                Sign Up
                            </Button>
                        </Stack>

                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="full-name"
                                    label="Full Name"
                                    name="fullName"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                            />

                            <Typography variant="body2" color="error" sx={{ minHeight: 20, mt: 0.5 }}>
                                {error}
                            </Typography>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 1 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? 'Login' : 'Register'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>

            <Snackbar open={open} autoHideDuration={4000} message={message} onClose={() => setOpen(false)} />
        </ThemeProvider>
    );
}
