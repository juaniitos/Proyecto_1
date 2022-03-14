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
import { useTranslation } from "react-i18next";

const OrdenVenta = (props) => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const {login} = useContext(SocketContext);
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState({});
    const [products, setProducts] = useState([]);
    const [inputText, setInputText] = useState("");
    const [ventaProductos, setVentaProductos] = useState([{}]);
    const [subTotal, setSubTotal] = useState([0]);

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
      };
    const updateSubTotal = (p) => {
        console.log("subtotal", subTotal)
        var st = [subTotal, p];
        console.log("subP",p);
        console.log("subST",st);
        setSubTotal(p);
    }

    const lineAdd = () => {
        // setVentaList([...ventaList, <VentaForm />])
        setVentaProductos([...ventaProductos, {}]);
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
                <h1>{t('orden_venta.h1')}</h1>
                {/* <img src={logo} width={"70vh"} /> */}
            </div>
            <h2 className="subTittle">{t('orden_venta.dcto')}</h2>
            <div>
                <div className="search client">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={clients}
                    getOptionLabel={(option) => (option?.ruc + " - " + option?.nombre +" "+ option?.apellido)}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={t('orden_venta.autocomplete_lb_a')} onChange={inputHandler}
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
                    renderInput={(params) => <TextField {...params} label={t('orden_venta.autocomplete_lb_b')} onChange={inputHandler }
                    variant="outlined" />}
                    onChange={(event, newValue) => {
                        // setProducto(newValue);
                        const l = ventaProductos[ventaProductos.length -1]
                        if(Object.keys(l.length == 0)){  
                            // console.log('Entré!')  
                            const new_list = [...ventaProductos]
                            new_list[ventaProductos.length -1] = newValue                     
                            setVentaProductos(new_list)
                        } else {
                            setVentaProductos([...ventaProductos, newValue])
                        }
                    }}            
                />
                </div>
                {ventaProductos.map ((v, index) => {
                return (
                    <Card key={index}>
                        {<VentaForm input={v} updatePrice={updateSubTotal} />}
                    </Card>
                )
            })}                
            </div>
            <img  src={adicion} alt='adicionar linea' width={'20vh'} onClick={ lineAdd } />
            <Card className="resumen">
                <Table>
                    <tbody>
                        <tr>
                            <th>{t('orden_venta.table_th_a')}</th>
                            <td><p> { subTotal } </p></td>
                        </tr>
                        <tr>
                            <th>{t('orden_venta.table_th_b')}</th>
                            <td><Input/></td>
                        </tr>
                        <tr>
                            <th>{t('orden_venta.table_th_c')}</th>
                            <td><Input/></td>
                        </tr>
                    </tbody>
                </Table>
            </Card>
            <br/>
            <Button className="buttonOv" color="success" onClick={() => navigate('#')}>{t('orden_venta.btn_fact')}</Button>
            <Button className="buttonOv" onClick={() => navigate('#')}>{t('orden_venta.btn_cot')}</Button>
            <Button className="buttonOv" color="primary" onClick={() => navigate('/Home')}>{t('orden_venta.button')}</Button>
            </>}
        </div>
    )
}
export default OrdenVenta;