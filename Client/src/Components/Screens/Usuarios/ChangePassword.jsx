import { Paper, Box, Button,FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import SocketContext from '../../../Context/socket-context';
import { useTranslation } from "react-i18next";

const ChangePassword = (props) => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const {setUsuario} = useContext(SocketContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('api/changePassword', inputs)
        .then(resp => {
            if(resp.data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o clave inválidos',
                  })
            } else {
                localStorage.removeItem('USUARIO');
                props.setLogin(false);
                navigate("/")
            }
        })
    }
        
    const actualizarInputs = ({target: {name, value}}) => {
        setInputs({...inputs, [name]: value});
    }

    return(
        <div className='init pass' >
            {/* Comienzo de formulario */}            
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className='pass_div'>
                <Typography component="h1" variant="h5">
                    {t('change_pass.typo')}
                </Typography>
                <Box component={"form"} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField margin='normal' required fullWidth name='oldPassword' label={t('change_pass.text_field_lb_a')} 
                    type={"password"} id="old-password" autoComplete='old-password' value={inputs.oldPassword} 
                    onChange={actualizarInputs} />
                    <TextField margin='normal' required fullWidth name='newPassword' label={t('change_pass.text_field_lb_b')} 
                    type={"password"} id="new-password" autoComplete='new-password' value={inputs.newPassword} 
                    onChange={actualizarInputs} />
                    <TextField margin='normal' required fullWidth name='confirmPassword' label={t('change_pass.text_field_lb_c')} 
                    type={"password"} id="confirm-password" autoComplete='confirm-password' value={inputs.confirmPassword} 
                    onChange={actualizarInputs} />            
                    <Button type="submit" variant='contained' sx={{mt:3, mb:2}}>
                        {t('change_pass.button')}
                    </Button>
                </Box>
            </Grid>
        </div>
    )
}
export default ChangePassword;