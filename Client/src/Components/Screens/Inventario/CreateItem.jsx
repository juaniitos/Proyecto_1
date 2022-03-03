import { Button, Form, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    const addProduct = (e) => {
        e.preventDefault();
        setNewProduct(initialProducts);
        console.log(newProduct);
        const {codigo, descripcion, precio, cantidad, marca, caracteristicas} = newProduct
        axios.post('/api/createProduct', {
            codigo, descripcion, precio, cantidad, marca, caracteristicas
        }).then((res) => console.log(res["Products"]))
        .catch((error) => console.log("Error", error))
    }

    const change = (e) => {
        const {name, value} = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    }

    return (
        <div>
            <h1>Crear Item</h1>
            <h2>En proceso ...</h2>
            <Form onSubmit={ addProduct }>
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
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
        </div>
    )
}
export default CreateItem;