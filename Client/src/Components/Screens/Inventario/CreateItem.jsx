import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import ProductForm from "../../ProductForm";
import SocketContext from "../../../Context/socket-context";

const CreateItem = () => {

    const {login} = useContext(SocketContext);
    const navigate = useNavigate();
    const initialProducts = {
        "codigo":"",
        "descripcion": "",
        "precio": "0",
        "cantidad": "0",
        "marca": "",
        "caracteristicas": "",
        "costo" : "0",
        "imgUrl" : "" 
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
            {login && <>
            <h1>Crear Item</h1>
            {/* <h2>En proceso ...</h2> */}
            <ProductForm read={[1,1,1,1,1,1,1,1]} p={newProduct} onSubmit={addProduct} label={'Crear'}/>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
            </>}
        </div>
    )
}
export default CreateItem;