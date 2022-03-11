import { Paper, Box, Button,FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import SocketContext from '../../../Context/socket-context';

const ChangePassword = (props) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const {setUsuario} = useContext(SocketContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("INPUT", inputs);
        axios.put('api/changePassword', inputs)
        .then(resp => {
            console.log("RESP",resp)
            // if(resp.data.error) {
            //     alert('Error', 'El usuario o clave no son válidos', 'error');
            // } else {
            //     //console.log("JSON",JSON.stringify(resp.data.data))
            //     props.setLogin(true);
            //     setUsuario(resp.data.data);
            //     localStorage.setItem('USUARIO', JSON.stringify(resp.data.data));
            //     navigate('/home')
            // }
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
                    Change Password
                </Typography>
                <Box component={"form"} noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField margin='normal' required fullWidth name='oldPassword' label="Old Password" 
                    type={"password"} id="password" autoComplete='old-password' value={inputs.oldPassword} 
                    onChange={actualizarInputs} />
                    <TextField margin='normal' required fullWidth name='newPassword' label="New Password" 
                    type={"password"} id="password" autoComplete='new-password' value={inputs.newPassword} 
                    onChange={actualizarInputs} />
                    <TextField margin='normal' required fullWidth name='confirmPassword' label="Confirm Password" 
                    type={"password"} id="confirmPassword" autoComplete='current-password' value={inputs.confirmPassword} 
                    onChange={actualizarInputs} />            
                    <Button type="submit" variant='contained' sx={{mt:3, mb:2}}>
                        Change Password
                    </Button>
                </Box>
            </Grid>
        </div>
    )
}
export default ChangePassword;