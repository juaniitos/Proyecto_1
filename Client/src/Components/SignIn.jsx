import { Avatar, Box, Button, createTheme, CssBaseline, FormControlLabel, Grid, Link, /* Link, */ Paper, TextField, /* LockOutlineIcon, */ ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import SocketContext from '../Context/socket-context';

function Copyright (props) {
    return(
        <Typography variant="body2" color="text.secondary" align='center' {...props}>
            {'Copyright © '}
            <Link color="inherit" href='http://mui.com' >
                Your Website
            </Link>{ ' ' }
            { new Date().getFullYear() }
            { '.' }
        </Typography>
    );
}

const theme = createTheme();

const SignInSide = (props) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const {setUsuario} = useContext(SocketContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("INPUT", inputs);
        axios.post('/api/login', inputs).then(resp => {
            console.log("RESP",resp)
            if(resp.data.error) {
                alert('Error', 'El usuario o clave no son válidos', 'error');
            } else {
                //console.log("JSON",JSON.stringify(resp.data.data))
                props.setLogin(true);
                setUsuario(resp.data.data);
                localStorage.setItem('USUARIO', JSON.stringify(resp.data.data));
                navigate('/home')
            }
        })
        //const data = new FormData(e.currentTarget);
        //console.log({
        //    email: data.get('email'),
        //    password: data.get('password')
        //});
    }
    const actualizarInputs = ({target: {name, value}}) => {
        setInputs({...inputs, [name]: value});
    }

    return(
        <div className='init' >
            <ThemeProvider theme={theme}  >
                {/*Imagen de portada */}
                <Grid container component="main" sx={{width: '100vh', height:'70vh' }} className='init'>
                    <CssBaseline/>
                    <Grid item xs={false} sm={12} ms={7} 
                    sx={{backgroundImage: 'url(https://www.acatha.io/wp-content/uploads/2020/09/acatha-vectorizado.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover', backgroundPosition: 'center' }}/>
                </Grid>
                {/* Formulario */}
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='init' >
                    <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Avatar (imagen de adorno) */}
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            {/* <LockOutlineIcon/> */}
                        </Avatar>
                        {/* Título */}
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        {/* Comienzo de formulario */}
                        <Box component={"form"} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                            <TextField margin='normal' required fullWidth id='email' 
                            label='Email Address' name='email' autoComplete='email' autoFocus value={inputs.email} onChange={actualizarInputs} />
                            <TextField margin='normal' required fullWidth name='password' 
                            label="Password" type={"password"} id="password" autoComplete='current-password' value={inputs.password} 
                            onChange={actualizarInputs} />
                            <FormControlLabel control={<Checkbox value='remenber' color="primary" /> }
                            label="Remember me" />
                            <Button type="submit" fullWidth variant='contained' sx={{mt:3, mb:2}}>
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='#' variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant='body2'>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }}/><br/>
                            <Typography color='red' align='center' >
                                Para pruebas puede utilizar:<br/>
                                Usuario: ventas@JD.com<br/>
                                Contraseña: 1234
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

            </ThemeProvider>
        </div>
    )
}
export default SignInSide;