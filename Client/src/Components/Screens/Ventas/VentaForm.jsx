import { Col,Form,FormGroup,Input } from "reactstrap";

const VentaForm = () => {

    return(
        <div>
            <Form>
                    <FormGroup row>
                        <Col md={3}>
                            <Input id="codigo" name="codigo" placeholder="codigo productos"
                            type="text"  /* onBlur={ navigate('/clientList')} */  />
                        </Col>
                        <Col md={3}>
                            <Input id="descripcion" name="descripcion" placeholder="descripcion productos"
                            type="text" />
                        </Col>
                        <Col md={2}>
                            <Input id="cantidad" name="cantidad" placeholder="cantidad" type="number" />
                        </Col>
                        <Col md={2}>
                            <Input id="precio" name="precio" placeholder="precio" type="number" />
                        </Col>
                        <Col md={2}>
                            <Input id="total" name="total" placeholder="0" type="number" />
                        </Col>
                    </FormGroup>
                </Form>
        </div>
    )
}
export default VentaForm;