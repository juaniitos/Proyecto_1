import { Avatar, Box, Button, createTheme, CssBaseline, FormControlLabel, Grid, Link, /* Link, */ Paper, TextField, /* LockOutlineIcon, */ ThemeProvider } from '@mui/material';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import SocketContext from '../Context/socket-context';
import { useTranslation } from "react-i18next";

function Copyright (props) {

    const { t } = useTranslation('translation');

    return(
        <Typography variant="body2" color="text.secondary" align='center' {...props}>
            {'Copyright © '}
            <Link color="inherit" href='http://mui.com' >
                {t('signin.typ_title')}                
            </Link>{ ' ' }
            { new Date().getFullYear() }
            { '.' }
        </Typography>
    );
}

const theme = createTheme();

const SignInSide = (props) => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    const {setUsuario} = useContext(SocketContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("INPUT", inputs);
        axios.post('/api/login', inputs).then(resp => {
            console.log("RESP",resp)
            if(resp.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o clave inválidos',
                  })
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
                <Grid container component="main" sx={{width: '120vh', height:'70vh' }} className='init'>
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
                    <Box sx={{ my: 8, mx: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Avatar (imagen de adorno) */}
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            {/* <LockOutlineIcon/> */}
                        </Avatar>
                        {/* Título */}
                        <Typography component="h1" variant="h5">
                            {t('signin.grid_title')}
                        </Typography>
                        {/* Comienzo de formulario */}
                        <Box component={"form"} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                            <TextField margin='normal' required fullWidth id='email' 
                            label={t('signin.text_field_lb_a')} name='email' autoComplete='email' autoFocus value={inputs.email} onChange={actualizarInputs} />
                            <TextField margin='normal' required fullWidth name='password' 
                            label={t('signin.text_field_lb_b')} type={"password"} id="password" autoComplete='current-password' value={inputs.password} 
                            onChange={actualizarInputs} />
                            <FormControlLabel control={<Checkbox value='remenber' color="primary" /> }
                            label={t('signin.form_control_label')} />
                            <Button type="submit" fullWidth variant='contained' sx={{mt:3, mb:2}}>
                                {t('signin.button')}
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='#' variant="body2">
                                        {t('signin.grid_link_a')}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant='body2'>
                                        {t('signin.grid_link_b')}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }}/><br/>
                            <Typography color='red' align='center' >
                                Para pruebas puede utilizar:<br/>
                                Usuario 1: ventas@JD.com<br/>
                                Contraseña: 1234<br/>
                                Usuario 2: ventas2@JD.com<br/>
                                Contraseña: 5678
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </ThemeProvider>
        </div>
    )
}
export default SignInSide;