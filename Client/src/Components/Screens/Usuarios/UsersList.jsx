import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = (props) => {

    const [users, setUsers] = useState([]);

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
            <ul>
                {users.map((user, _id) => {
                    return(
                        <li key={user._id}>{user.nombre + " " + user.apellido}</li>
                    )
                })}                    
            </ul>
        </div>
    )
}

export default UsersList;