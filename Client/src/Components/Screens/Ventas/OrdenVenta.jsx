import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Button,Card,Form,Input, Table} from "reactstrap";
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
    const [subTotal, setSubTotal] = useState(0);
    const [subTotalsList, setSubTotalsList] = useState([]);
    const [impuesto, setImpuesto] = useState([]);
    const [total, setTotal] = useState([]);
    const [cantidades, setCantidades] = useState([]);
    const [num, setNum] = useState(0)

    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
      };
    const updateSubTotal = (p, index) => {
        let new_subTotalsList = [0]
        if(subTotalsList.length > 0) {
            new_subTotalsList = [...subTotalsList];
            new_subTotalsList[index] = p
        }
        let new_sub = 0
        for(let i=0; i < new_subTotalsList.length; i++){
            new_sub = new_sub + new_subTotalsList[i]
        }
        setSubTotalsList(new_subTotalsList)
        setSubTotal(new_sub);
        const imp = 0.12;
        let imp_calc = new_sub * imp;
        let imp_decimal = imp_calc.toFixed(2);
        setImpuesto(imp_decimal);
        let tot = new_sub + (new_sub * 0.12);
        let tot_decimal = tot.toFixed(2);
        setTotal(tot_decimal);
        if(cantidades.length > 0) {
            setCantidades([...cantidades, [index] = p]);
        } else {
            setCantidades([])
        }
    }

    const lineAdd = () => {
        // setVentaList([...ventaList, <VentaForm />])
        setVentaProductos([...ventaProductos, {}]);
    }

    const addVenta = (e, ov) => {
        /* e.preventDefault(); */
        const data = {
            cliente : client,
            product: ventaProductos,
            contador: num,
            cantidades: cantidades,
            precio: ventaProductos.price,
            subtotal: subTotal,
            impuesto: impuesto,
            total: total
        }
        axios.post('/api/createOrdenVenta', data)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
            navigate('/ordenventa')
    }

    useEffect (() => {
        axios.get('/api/clients')
        .then(res => {
            console.log("RES-CLIENTES", res.data.clients);
            setClients(res.data.clients);
        })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        });
        axios.get('/api/products')
        .then(res => {
            // console.log("RES", res.data.products);
            setProducts(res.data.products);
        })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        });
        axios.get('/api/ventas')
        .then(res => {
            console.log(res.data.ventas)
            setNum(res.data.ventas.length + 1)
        })
        .catch(err => {
            console.log("NO FUNCIONA", err)
        })
    },[])  

    const addNum = () => {
        setNum(num + 1);
    }

    return (
        <div>
            {login && <>
            <Form onSubmit={addVenta}>
                <div className="cabOV" >
                    <h1>{t('orden_venta.h1')}</h1>
                    {/* <img src={logo} width={"70vh"} /> */}
                </div>
                <h2 className="subTittle">{t('orden_venta.dcto')}<span> {num} </span>
                    <img src={adicion} alt='adicionar numero' width={'20vh'} onClick={ addNum }/>
                </h2>               
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
                            {/* {console.log('v', v)} */}
                            {<VentaForm input={v} updatePrice={updateSubTotal} index={index} />}
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
                                <td><p>{ subTotal ? subTotal : 0 }</p></td>
                            </tr>
                            <tr>
                                <th>{t('orden_venta.table_th_b')}</th>
                                <td><p>{ impuesto ? impuesto : 0 }</p></td>
                            </tr>
                            <tr>
                                <th>{t('orden_venta.table_th_c')}</th>
                                <td><p>{ total ? total : 0 }</p></td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
                <br/>
                <Button className="buttonOv" color="success" type='submit' /* onClick={() => navigate('#')} */ >{t('orden_venta.btn_fact')}</Button>
                {/* <Button className="buttonOv" onClick={() => navigate('#')}>{t('orden_venta.btn_cot')}</Button> */}
                {/* <Button className="buttonOv" color="primary" onClick={() => navigate('/Home')}>{t('orden_venta.button')}</Button> */}
            </Form>
            </>}
        </div>
    )
}
export default OrdenVenta;