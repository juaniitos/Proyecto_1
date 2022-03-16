import { Button, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

// const Delete = ({width = 24, height = 24, color='#ffffff'}) => {
//     <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} className="bi bi-trash3-fill" viewBox="0 0 16 16">
//         <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"></path>
//     </svg>
// }

// const Edit = ({width = 24, height = 24, color='#ffffff'}) => {
//     <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={color} className="bi bi-pencil-square" viewBox="0 0 16 16">
//         <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"></path>
//         <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"></path>
//     </svg>
// }

const ClientList = () => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const {login} = useContext(SocketContext);

   const deleteClient = (_id) => {
        axios.delete('/api/clients/delete/' + _id)
        .then(res => {
            setClients(clients.filter(c => c._id !== _id));
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const listaActivos = () => {
        axios.get('/api/clients/active')   
        .then(res => {
            setClients(res.data.clients);
            setLoaded(true);
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    const listaNoActivos = () => {
        axios.get('/api/clients/noActive')   
        .then(res => {
            setClients(res.data.clients);
            setLoaded(true);
        })
        .catch(err => {
            console.log(err)
        })      
    }

    const listClientes = () => {
        axios.get('/api/clients')   
        .then(res => {
            setClients(res.data.clients);
            setLoaded(true);
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    return (
        <div>
            {login && <>
            <h1>{t('client_list.h1')}</h1>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {t('client_list.dropdown_toggle')}                    
                </DropdownToggle>
                <DropdownMenu> 
                    <DropdownItem onClick={listaActivos}>{t('client_list.dropdown_item_a')}</DropdownItem>
                    <DropdownItem onClick={listaNoActivos}>{t('client_list.dropdown_item_b')}</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={listClientes}>{t('client_list.dropdown_item_c')}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
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
                                <td>{c.activo == true ? `${t('client_form.form_act')}` : `${t('client_form.form_no_act')}`}</td>                                                                                        
                                <td><Button color="success" onClick={() => navigate('/client/editar/' + c._id)}>{t('client_list.th_btn_a')}</Button>&nbsp;&nbsp;<Button color="danger" onClick={() => {deleteClient(c._id)}}>{t('client_list.th_btn_b')}</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </>}
            </Table>
            {/* <Button color="primary" onClick={() => navigate('/Home')}>{t('client_list.button')}</Button>                 */}
            </>}
        </div>
    )
}
export default ClientList;