import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import ProductForm from "../Inventario/ProductForm";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

const CreateItem = () => {

    const { t } = useTranslation('translation');
    const {login} = useContext(SocketContext);
    const navigate = useNavigate();
    const initialProducts = {
        "codigo": "",
        "descripcion": "",
        "precio": 0,
        "cantidad": 0,
        "marca": "",
        "caracteristicas": "",
        "costo" : 0,
        "imgUrl" : "" 
    }
    const [newProduct, setNewProduct] = useState(initialProducts);
    const [errorsObject, setErrorsObject] = useState({});

    const addProduct = (e, p) => {
        e.preventDefault();
        console.log(p)
        axios.post('/api/createProduct', p)
            .then(res => {
                console.log(res)
                setNewProduct(initialProducts)
                navigate('/products')                
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                setErrorsObject(errorResponse);
            });
    }

    return (
        <div>
            {login && <>
            <h1>{t('crear_item.h1')}</h1>
            {/* <h2>En proceso ...</h2> */}
            <ProductForm read={[1,1,1,1,1,1,1,1,1]} p={newProduct} onSubmit={addProduct} label={t('crear_item.crear')} errorsObject={errorsObject}/>
            {/* <Button color="primary" onClick={() => navigate('/Home')}>{t('crear_item.button')}</Button> */}
            </>}
        </div>
    )
}
export default CreateItem;