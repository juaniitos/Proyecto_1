import { Button, Table } from "reactstrap";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductTable from "../../ProductTable";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

const ListaPrecios = (props) => {

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
            {login && <>
            <h1>{t('lista_precios.h1')}</h1>
            <h2>En proceso ...</h2>
            <ProductTable ths={[{th: 'Código', key: 'codigo'}, {th: 'Descripción', key: 'descripcion'}, {th: 'Precio', key: 'precio'}]} inputs={inputs} loaded={loaded} deleteProduct={deleteProduct} />
            <Button color="primary" onClick={() => navigate('/Home')}>{t('lista_precios.button')}</Button>
            </>}
        </div>
    )
}
export default ListaPrecios;