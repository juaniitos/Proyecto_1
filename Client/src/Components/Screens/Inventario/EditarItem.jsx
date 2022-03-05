import { Button, Form, Input, Label } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../ProductForm";

const EditarItem = () => {
    const {_id} = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState([]);
    const [loaded, setLoaded] = useState(false);

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
                navigate(-1)
            })
            .catch (err => {
                console.log(err)
            });
    }

    return (
        <div>
            <h1>Editar Item</h1>
            <h2>En proceso ...</h2>
            {loaded &&
            <ProductForm read={[1,1,1,1,1,1]} p={product} onSubmit={editarProduct} label={'Editar'}/>
            }
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
        </div>
    )
}
export default EditarItem;