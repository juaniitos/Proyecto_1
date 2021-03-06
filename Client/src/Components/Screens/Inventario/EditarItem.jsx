import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../Inventario/ProductForm";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

const EditarItem = (props) => {

    const { t } = useTranslation('translation');
    const {_id} = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errorsObject, setErrorsObject] = useState({});

    const {login} = useContext(SocketContext);

    useEffect(() => {
        axios.get('/api/products/' + _id)
            .then(res => {
                console.log(res)
                setProduct(res.data.product);
                setLoaded(true);
            })
    }, [])

    const editarProduct = (e, p) => {
        console.log(p);
        e.preventDefault();
        axios.put('/api/products/update/'+ _id, p)
            .then(res => {             
                console.log(res);                
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
            <h1>{t('editar_item.h1')}</h1>
            {/* <h2>En proceso ...</h2> */}
            {loaded &&
            <ProductForm read={window.location.pathname !== '/products' ? [0,1,1,1,1,1,0,1,1] : [0,0,0,0,0,0,0,0,0]} p={product} onSubmit={editarProduct} label={t('editar_item.editar')} errorsObject={errorsObject}/>
            }
            {/* <Button color="primary" onClick={() => navigate('/Home')}>{t('editar_item.button')}</Button> */}
            </>}
        </div>
    )
}
export default EditarItem;