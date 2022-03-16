import { Button, Table } from 'reactstrap';
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

const ClientList = () => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [ventas, setVentas] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const {login} = useContext(SocketContext);

    useEffect(() =>{
        axios.get('/api/ventas')
            .then(res => {
                console.log("RES", res.data.ventas);
                setVentas(res.data.ventas);
                setLoaded(true);
        })
            .catch (err => {
                console.log("NO FUNCIONA", err)
            })
    }, [])

    return (
        <div>
            {login && <>
            <h1>Lista de Ventas</h1>
            <Table striped className="tableProducts">
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Id</th>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                        <th>Impuesto</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {loaded && <>
                <tbody>
                    {ventas.map((v, _id) => { 
                        return(
                            <tr key={v._id}>
                                <td>{v.contador}</td>
                                <td>{v.nombre}</td>
                                <td>{v.apellido}</td>
                                <td>{v.id}</td>
                                <td>{v.codigo}</td> 
                                <td>{v.descripcion}</td> 
                                <td>{v.cantidad}</td>  
                                <td>{v.precio}</td>  
                                <td>{v.subtotal}</td>
                                <td>{v.impuesto}</td> 
                                <td>{v.total}</td>                                                                                   
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