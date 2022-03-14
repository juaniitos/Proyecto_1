import React, { useState, useEffect, useContext } from 'react';
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";
import { Autocomplete,TextField } from "@mui/material";
import { Button } from 'reactstrap';
import Chat from './Chat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import UsersList from './UsersList';

const UsersConnection = () => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const {login} = useContext(SocketContext);
    const [users, setUsers] = useState([]);
    const [inputText, setInputText] = useState("");

    
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    useEffect (() => {
        axios.get('/api/users')
        .then(res => {
            console.log("RES", res.data.users);
            setUsers(res.data.users);
        })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        });
    },[]) 

    return(
        <div>
            {login && <>
            <h2>{t('users_conn.h2')}</h2>
            <div>
            <div className="d-flex justify-content space-between">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={users}
                    getOptionLabel={(option) => (option?.nombre +" "+ option?.apellido)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={t('users_conn.label')} onChange={inputHandler}
                    variant="outlined" />}
                    onChange={(event, newValue) => {
                        setUsers(newValue);
                      }}
              
                    />
                    <Button className='header btn-user' onClick={() => navigate('/Home')}>{t('inf_venta.button')}</Button>
                </div>
                {/* <UsersList /> */}
                <div>
                    <Chat input={users}/>
                </div>
            </div>
            </>}
        </div>
    )
}

export default UsersConnection;