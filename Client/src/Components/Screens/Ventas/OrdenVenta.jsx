import React from "react";
import { useNavigate } from "react-router-dom";
import { Button,Card,Col,Form,FormGroup,Input,Label} from "reactstrap";
import logo from "../../../static/images/logo_JD2.jpg";

const OrdenVenta = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="cabOV" >
                <h1>OrdenVenta</h1>
                <img src={logo} width={"70vh"} />
            </div>
            <h2>En proceso ...</h2>
            <Form>
                <FormGroup row>
                    <Label for="nombre cliente" sm={2}>Nombre Cliente:</Label>
                    <Col sm={3}>
                        <Input id="nombre" name="nombre" placeholder="inserte nombre de cliente"
                        type="text" />
                    </Col>
                    <Label for="apeliido cliente" sm={2}>Apeliido Cliente</Label>
                    <Col sm={3}>
                        <Input id="apellido" name="apellido" placeholder="inserte apeliido de cliente"
                        type="text" />
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Label for="identificacion" sm={2}  >ID </Label>
                    <Col sm={3} md={6} >
                        <Input  id="_id" name="_id" placeholder="inserte identificacion de cliente"
                        type="number" />
                    </Col>
                </FormGroup>
            </Form>
            {/* <VideoListItem/> */}
            {/* <CardImg width="100%" src={"/images/logo_JD2.jpg"} alt={'logo'} /> */}
            <Card>
                <Form>
                    <FormGroup row>
                        <Col md={3}>
                            <Input id="codigo" name="codigo" placeholder="codigo productos"
                            type="text" />
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
            </Card>
            <br/>
            <Button className="buttonOv" color="success" onClick={() => navigate('#')}>Facturar</Button>
            <Button className="buttonOv" onClick={() => navigate('#')}>Cotizar</Button>
            <Button className="buttonOv" color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
        </div>
    )
}
export default OrdenVenta;