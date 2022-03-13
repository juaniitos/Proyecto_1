import { Button } from "reactstrap";
import React, { useState, useEffect, useContext } from "react";
import { /* Link,  */ useNavigate/* , useParams */ } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";


const SearchProducts = (props) => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const { _id } = useParams();

    const {login} = useContext(SocketContext);

    useEffect(() =>{
        axios.get('/api/products/'+ _id)
            .then(res => {
                console.log("PROPS", props.product);
                setInputs(res.data.product);
                setLoaded(true);
        })
            .catch (err => {
                console.log("NO FUNCIONA", err)
            })
    }, [])

    /* const result = [product]
    console.log("RESULT", result) */

    return (
        <div>
            {login && <>
            <h1>{t('buscar_prod.h1')}</h1>
            <h2>En proceso ...</h2>
            <div className="tableProducts" >
            {/* <Form onSubmit={ addProduct }>
                <Label>Código:</Label>
                <Input type="text" name="codigo" value={newProduct.codigo} onChange={change} required  placeholder="Inserte código"/>
                <Label>Descripción:</Label>
                <Input type="text" name="descripcion" value={newProduct.descripcion} onChange={change} required  placeholder="Inserte descripción"/>
                <Label>Precio:</Label>
                <Input type="text" name="precio" value={newProduct.precio} onChange={change} required  placeholder="Inserte precio"/>
                <Label>Cantidad:</Label>
                <Input type="text" name="cantidad" value={newProduct.cantidad} onChange={change} placeholder="Inserte cantidad"/>
                <Label>Marca:</Label>
                <Input type="text" name="marca" value={newProduct.marca} onChange={change} required placeholder="Inserte marca"/>
                <Label>Características:</Label>
                <Input type="text" name="caracteristicas" value={newProduct.caracteristicas} onChange={change} placeholder="Inserte caracteristicas"/>
                <br/>
                <Button type="submit" color="success" >Crear ítem</Button>
                <br/><br/>
            </Form>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button> */}
            </div>
            <Button color="primary" onClick={() => navigate('/Home')}>{t('buscar_prod.button')}</Button>
            </>}
        </div>
    )
}
export default SearchProducts;