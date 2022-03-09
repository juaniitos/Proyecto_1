import { Button, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SocketContext from "../../../Context/socket-context";

const ClientList = (props) => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [clientActive, setClientActive] = useState(true);

    const {login} = useContext(SocketContext);

    useEffect(() =>{
        axios.get('/api/clients')
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

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const listaActivos = () => {
        if(clients.activo == true) {
            setClientActive(clientActive)
        }
        else {
            setClients(...clients)
        }        
    }

    const listaNoActivos = () => {
        if(clients.activo == false) {
            setClientActive(!clientActive)
        }
        else {
            setClients(...clients)
        }        
    }

    const listClientes = () => {
        setClients(...clients)
    }

    return (
        <div>
            {login && <>
            <h1>Lista de Clientes</h1>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    Filtrar Clientes
                </DropdownToggle>
                <DropdownMenu> 
                    <DropdownItem onClick={listaActivos}>Clientes Activos</DropdownItem>
                    <DropdownItem onClick={listaNoActivos}>Clientes Inactivos</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={listClientes}>Lista de clientes</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Table striped className="tableProducts">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>RUC</th>
                        <th>Email</th>
                        <th>Saldo del cliente</th>
                        <th>Estado del cliente</th>
                        <th>Acciones</th>
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
                                <td>{c.activo == true ? 'Activo' : 'Inactivo'}</td>                                                                                        
                                <td><Button color="success" onClick={() => navigate('/client/editar/' + c._id)}>Editar</Button>&nbsp;&nbsp;<Button color="danger" onClick={() => {deleteClient(c._id)}}>Eliminar</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </>}
            </Table>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>                
            </>}
        </div>
    )
}
export default ClientList;