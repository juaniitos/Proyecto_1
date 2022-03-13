import { Button, Table } from "reactstrap";
import React, { useState, useEffect, useContext } from "react";
import { /* Link,  */ useNavigate/* , useParams */ } from "react-router-dom";
import axios from "axios";
import ProductTable from "../../ProductTable";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

const ListaProductos = (props) => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [loaded, setLoaded] = useState(false);

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

    return (
        <div>
            {/* {console.log("INPUTS", inputs[0])}
            {console.log("LOADED", loaded)} */}
            {login && <>
            <h1>{t('lista_prod.h1')}</h1>
            <h2>En proceso ...</h2>
            <ProductTable ths={[{th: 'Código', key: 'codigo'}, {th: 'Descripción', key: 'descripcion'}, {th: 'Cantidad', key: 'cantidad'}, {th: 'Precio', key: 'precio'}]} imagen={inputs.imgUrl} inputs={inputs} loaded={loaded} deleteProduct={deleteProduct}/>
            <Button color="primary" onClick={() => navigate('/Home')}>{t('lista_prod.button')}</Button>                
            </>}
        </div>
    )
}
export default ListaProductos;