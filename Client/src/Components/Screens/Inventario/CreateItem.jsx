import { Button, Form, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ProductForm from "../../ProductForm";

const CreateItem = () => {
    const navigate = useNavigate();
    const initialProducts = {
        "codigo":"",
        "descripcion": "",
        "precio": "0",
        "cantidad": "0",
        "marca": "",
        "caracteristicas": ""
    }
    const [newProduct, setNewProduct] = useState(initialProducts);
    
    const addProduct = (e, p) => {
        e.preventDefault();
        console.log(p)
        axios.post('/api/createProduct', p)
            .then(res => {
                console.log(res)
                setNewProduct(initialProducts)
                navigate('/Home')                
            })
            .catch(error => console.log("Error", error))
    }

    return (
        <div>
            <h1>Crear Item</h1>
            <h2>En proceso ...</h2>
            <ProductForm read={[1,1,1,1,1,1]} p={newProduct} onSubmit={addProduct} label={'Crear'}/>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
        </div>
    )
}
export default CreateItem;