import { Button, Table } from "reactstrap";
import React, { useState, useEffect, useContext } from "react";
import { /* Link,  */ useNavigate } from "react-router-dom";
import axios from "axios";
import SocketContext from "../../../Context/socket-context";

const NewListaProductos = (props) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // const [btnActive, setBtnActive] = useState(false);

    const {login} = useContext(SocketContext);

    useEffect(() =>{
        axios.get('/api/products')
            .then(res => {
                console.log("RES", res.data.products);
                setInputs(res.data.products);
                setLoaded(true);
        })
            .catch (err => {
                console.log("NO FUNCIONA", err)
            })
    }, [])

    const deleteProduct = (_id) => {
        axios.delete('/api/products/delete/' + _id)
        .then(res => {
            setInputs(inputs.filter(p => p._id !== _id));
        })
        .catch(err => {
            console.log(err)
        })
    }

    // const agrandarImg = () => {
    //     setBtnActive(!btnActive);
    // }

    return (
        <div>
            {/* {console.log("INPUTS", inputs[0])}
            {console.log("LOADED", loaded)} */}
            {login && <>
            <h1>Lista de Productos</h1>
            <h2>En proceso ...</h2>
            <Table striped className="tableProducts">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Imagen del producto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                {loaded && <>
                <tbody>
                    {inputs.map((p, _id) => { 
                        return(
                            <tr key={p._id}>
                                <td>{p.codigo}</td>
                                <td>{p.descripcion}</td>
                                <td>{p.cantidad}</td>
                                <td>{p.precio}</td>  
                                <td><img className="img_prod" src={p.imgUrl} alt="imagen producto"/></td>                                                         
                                {/* {btnActive && <Button className="btn_img" color="none" onClick={agrandarImg}><img className="img_prod" src={p.imgUrl} alt="imagen producto"/></Button>} */}
                                <td><Button color="success" onClick={() => navigate('/item/editar/' + p._id)}>Editar</Button>&nbsp;&nbsp;<Button color="danger" onClick={() => {deleteProduct(p._id)}}>Eliminar</Button></td>
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
export default NewListaProductos;