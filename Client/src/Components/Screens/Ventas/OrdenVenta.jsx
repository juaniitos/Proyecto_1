import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Button,Card,Input, Table} from "reactstrap";
import TextField from "@mui/material/TextField";
import SocketContext from "../../../Context/socket-context";
import adicion from "../../../static/images/icons/adicional_linea.png"  ;
import FormOfClients from './FormOfClients';
import VentaForm from "./VentaForm";
import { Autocomplete } from "@mui/material";
import axios from "axios";


const OrdenVenta = (props) => {
    const navigate = useNavigate();
    const [ventaList, setVentaList] = useState([<VentaForm/>]);
    const {login} = useContext(SocketContext);
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({});
    const [products, setProducts] = useState([]);
    const [producto, setProducto] = useState({});
    const [inputText, setInputText] = useState("");

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
      };

    const lineAdd = () => {
        setVentaList([...ventaList, <VentaForm />])
    }

    useEffect (() => {
        axios.get('/api/clients')
        .then(res => {
            console.log("RES", res.data.clients);
            setClients(res.data.clients);
        })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        });
    },[]) 

    useEffect (() => {
        axios.get('/api/products')
        .then(res => {
            console.log("RES", res.data.products);
            setProducts(res.data.products);
        })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        });
    },[]) 

    return (
        <div>
            {login && <>
            <div className="cabOV" >
                <h1>OrdenVenta</h1>
                {/* <img src={logo} width={"70vh"} /> */}
            </div>
            <h2 className="subTittle" >Documento no. </h2>
            <div>
                <div className="search client">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={clients}
                    getOptionLabel={(option) => (option?.ruc + " - " + option?.nombre +" "+ option?.apellido)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Buscador de clientes" onChange={inputHandler}
                    variant="outlined" />}
                    onChange={(event, newValue) => {
                        setClient(newValue);
                      }}
              
                    />
                </div>
                <FormOfClients input={client}/>
            </div>
            
            <div>
                <div className="search client">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={products}
                    getOptionLabel={(option) => (option?.codigo + " - " + option?.descripcion +" "+ option?.precio)}
                    sx={{ width: 500 }}
                    renderInput={(params) => <TextField {...params} label="Buscador de productos" onChange={inputHandler }
                    variant="outlined" />}
                    onChange={(event, newValue) => {
                        setProducto(newValue);
                    }}
            
                />
                </div>
                {ventaList.map ((v, index) => {
                return (
                    <Card key={index}>
                        {v=<VentaForm input={producto} />}
                    </Card>
                )
            })}                
            </div>
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