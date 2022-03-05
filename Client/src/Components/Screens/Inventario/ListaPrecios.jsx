import { Button, Table } from "reactstrap";
import React, { useState, useEffect } from "react";
import { /* Link,  */ useNavigate,/* , useParams */ 
useParams} from "react-router-dom";
import axios from "axios";
import ProductTable from "../../ProductTable";

const ListaPrecios = (props) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [loaded, setLoaded] = useState(false);


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

    return (
        <div>
            <h1>Lista de Precios</h1>
            <h2>En proceso ...</h2>
            <ProductTable ths={[{th: 'Código', key: 'codigo'}, {th: 'Descripción', key: 'descripcion'}, {th: 'Precio', key: 'precio'}]} inputs={inputs} loaded={loaded} deleteProduct={deleteProduct} />
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
        </div>
    )
}
export default ListaPrecios;