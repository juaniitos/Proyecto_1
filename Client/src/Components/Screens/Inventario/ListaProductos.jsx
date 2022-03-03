import { Button, Table } from "reactstrap";
import React, { useState, useEffect } from "react";
import { /* Link,  */ useNavigate/* , useParams */ } from "react-router-dom";
import axios from "axios";

const ListaProductos = (props) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    /* const {index} = useParams(); */


    useEffect(() =>{
        axios.get('/api/products')
            .then(res => {
                console.log("RES", res.data.product);
                setInputs(res.data.product);
                setLoaded(true);
        })
            .catch (err => {
                console.log("NO FUNCIONA", err)
            })
    }, [])

    return (
        <div>
            {console.log("INPUTS", inputs[0])}
            {console.log("LOADED", loaded)}
            <h1>ListaProductos</h1>
            <h2>En proceso ...</h2>
            <div className="tableProducts" >
                <Table className="table1">
                    <thead>
                        Codigo
                    </thead>
                    {loaded &&
                    <tbody>
                        <tr>
                            {inputs.map((p) => {
                                return(
                                    <tr key={p._id}>
                                        <tr>
                                            <tr><Button color="#ffffff" onClick={() => navigate('#')}> {p.codigo} </Button></tr>
                                        </tr> 
                                    </tr>
                                )
                            })}
                            </tr>
                    </tbody>}
                </Table>
                <Table className="table2">
                    <thead>
                        Descripción
                    </thead>
                    {loaded &&
                    <tbody>
                        <tr>
                            {inputs.map((p) => {
                                return(
                                    <tr key={p._id}>
                                        <tr>
                                            <tr><Button color="#ffffff" onClick={() => navigate('#')}> {p.descripcion} </Button></tr>
                                        </tr> 
                                    </tr>
                                )
                            })}
                            </tr>
                    </tbody>}
                </Table>
                <Table className="table3">
                    <thead>
                        Cantidad
                    </thead>
                    {loaded &&
                    <tbody>
                        <tr>
                            {inputs.map((p) => {
                                return(
                                    <tr key={p._id}>
                                        <tr>
                                            <tr><Button color="#ffffff" onClick={() => navigate('#')}> {p.cantidad} </Button></tr>
                                        </tr> 
                                    </tr>
                                )
                            })}
                            </tr>
                    </tbody>}
                </Table>
                <Table className="table4">
                    <thead>
                        Precio
                    </thead>
                    {loaded &&
                    <tbody>
                        <tr>
                            {inputs.map((p) => {
                                return(
                                    <tr key={p._id}>
                                        <tr>
                                            <tr><Button color="#ffffff" onClick={() => navigate('#')}> {p.precio} </Button></tr>
                                        </tr> 
                                    </tr>
                                )
                            })}
                            </tr>
                    </tbody>}
                </Table>
            </div>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
            
        </div>
    )
}
export default ListaProductos;