import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Button,Card,Input, Table} from "reactstrap";
import SocketContext from "../../../Context/socket-context";
import adicion from "../../../static/images/icons/adicional_linea.png"  ;
import FormOfClients from './FormOfClients';
import VentaForm from "./VentaForm";


const OrdenVenta = (props) => {
    const navigate = useNavigate();
    const [ventaList, setVentaList] = useState([<VentaForm/>]);
    const {login} = useContext(SocketContext);

    const lineAdd = () => {
        setVentaList([...ventaList, <VentaForm/>])
    }

    return (
        <div>
            {login && <>
            <div className="cabOV" >
                <h1>OrdenVenta</h1>
                {/* <img src={logo} width={"70vh"} /> */}
            </div>
            <h2 className="subTittle" >Documento no. </h2>
                <FormOfClients/>
            
            {ventaList.map ((v) => {
                return (
                    <Card>
                        {v}
                    </Card>
                )
            })}
            <img  src={adicion} alt='adicionar linea' width={'20vh'} onClick={ lineAdd } />
            <Card className="resumen">
                <Table>
                    <tbody>
                        <tr>
                            <th>Subtotal:</th>
                            <td><Input/></td>
                        </tr>
                        <tr>
                            <th>Impuesto:</th>
                            <td><Input/></td>
                        </tr>
                        <tr>
                            <th>Total:</th>
                            <td><Input/></td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
            <br/>
            <Button className="buttonOv" color="success" onClick={() => navigate('#')}>Facturar</Button>
            <Button className="buttonOv" onClick={() => navigate('#')}>Cotizar</Button>
            <Button className="buttonOv" color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
            </>}
        </div>
    )
}
export default OrdenVenta;