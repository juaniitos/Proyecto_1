import React, { useState, useEffect, useContext } from 'react';
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";
import { Autocomplete,TextField } from "@mui/material";
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
    const [userEmit, setUserEmit] = useState();
    const [chatList, setChatList] = useState([]);
    const { usuario } = useContext(SocketContext);
    
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
            <div className="search client">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={users.filter((u) => {
                        if(u.email !== usuario.email){
                            return u
                        }
                    })}
                    getOptionLabel={(option) => (option?.nombre +" "+ option?.apellido)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={t('users_conn.label')} onChange={inputHandler}
                    variant="outlined" />}
                    onChange={(event, newValue) => {
                        console.log(newValue)
                        setUserEmit(newValue)
                        setChatList([...chatList, <Chat input={newValue}/>])
                      }}
              
                    />
                </div>
                {/* <UsersList /> */}
                {/* <div>
                    <Chat input={userEmit}/>
                </div> */}
                {chatList.map((cl) => {
                    return (
                        <div>{cl}</div>
                    )
                })}
            </div>
            </>}
        </div>
    )
}

export default UsersConnection;