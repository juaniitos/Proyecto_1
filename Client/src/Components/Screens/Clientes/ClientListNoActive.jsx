import { Button, Table } from "reactstrap";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

const ClientList = (props) => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const {login} = useContext(SocketContext);

    useEffect(() =>{
        axios.get('/api/clients/noActive')
            .then(res => {
                console.log("RES", res.data.clients);
                setClients(res.data.clients);
                setLoaded(true);
        })
            .catch (err => {
                console.log("NO FUNCIONA", err)
            })
    }, [])

    const deleteClient = (_id) => {
        axios.delete('/api/clients/delete/' + _id)
        .then(res => {
            setClients(clients.filter(c => c._id !== _id));
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            {login && <>
            <h1>{t('client_list.h1?')}</h1>
            <h2>En proceso ...</h2>
            <Table striped className="tableProducts">
                <thead>
                    <tr>
                        <th>{t('client_list.th_a')}</th>
                        <th>{t('client_list.th_b')}</th>
                        <th>{t('client_list.th_c')}</th>
                        <th>{t('client_list.th_d')}</th>
                        <th>{t('client_list.th_e')}</th>
                        <th>{t('client_list.th_f')}</th>
                        <th>{t('client_list.th_g')}</th>
                    </tr>
                </thead>
                {loaded && <>
                <tbody>
                    {clients.map((c, _id) => { 
                        return(
                            <tr key={c._id}>
                                <td>{c.nombre}</td>
                                <td>{c.apellido}</td>
                                <td>{c.ruc}</td>
                                <td>{c.email}</td> 
                                <td>{c.saldo}</td> 
                                <td>{c.inactivo == true ? 'inactivo' : ''}</td>                                                                                        
                                <td><Button color="success" onClick={() => navigate('/client/editar/' + c._id)}>{t('client_list.th_btn_a')}</Button>&nbsp;&nbsp;<Button color="danger" onClick={() => {deleteClient(c._id)}}>{t('client_list.th_btn_b')}</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </>}
            </Table>
            <Button color="primary" onClick={() => navigate('/Home')}>{t('client_list.button')}</Button>                
            </>}
        </div>
    )
}
export default ClientList;