import axios from "axios";
import { useEffect, useState } from "react";
import { Col,Form,FormGroup,Input } from "reactstrap";

const VentaForm = (props) => {
    const [products, setProducts] = useState([]);

    useEffect (() => {
        axios.get('/api/products')
        .then(res => {
            // console.log("RES", res.data.clients);
            setProducts(res.data.products);
        })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        });
    }, [])

    return(
        <div>
            <Form>
                    <FormGroup row>
                        <Col md={3}>
                            <Input id="codigo" name="codigo" placeholder="codigo productos"
                            type="text" value={props.input?.codigo} />
                        </Col>
                        <Col md={3}>
                            <Input id="descripcion" name="descripcion" placeholder="descripcion productos"
                            type="text" value={props.input?.descripcion} />
                        </Col>
                        <Col md={2}>
                            <Input id="cantidad" name="cantidad" placeholder="cantidad" type="number" 
                            value={props.input?.cantidad} />
                        </Col>
                        <Col md={2}>
                            <Input id="precio" name="precio" placeholder="precio" type="number"
                            value={props.input?.precio} />
                        </Col>
                        <Col md={2}>
                            <Input id="total" name="total" placeholder="0" type="number" 
                            value={props.input?.total} />
                        </Col>
                    </FormGroup>
                </Form>
        </div>
    )
}
export default VentaForm;