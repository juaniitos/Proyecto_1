import { useEffect, useState } from "react";
import axios from "axios";
import { Col,Form,FormGroup,Input, Label } from "reactstrap";

const FormOfClient = () => {

    const [clients, setClients] = useState([]);
    const [nombreCliente, setNombreCliente] = useState("");

    useEffect (() => {
        axios.get('/api/clients')
        .then(res => {
            console.log("RES", res.data.clients);
            setClients(res.data.clients);
            /* setLoaded(true); */
    })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        })
    },[]) 

    const cambioNombre = (e) => {
        setNombreCliente(e.target.value)

    }
    useEffect (() => {
        clients.filter((c) => {
            /* console.log(c); */
            if (c.nombre.toLowerCase().includes(nombreCliente)) {
                console.log(c.nombre)
                console.log('-----------')
            }
        })
    },[nombreCliente])

    return(
        <div>
            <Form >
                <FormGroup row>
                    <Label for="nombre cliente" sm={2}>Nombre Cliente:</Label>
                    <Col sm={3}>
                        <Input id="nombre" name="nombre" placeholder="inserte nombre de cliente" value={nombreCliente}
                        type="text" onChange={cambioNombre} />
                    </Col>
                    <Label for="apeliido cliente" sm={2}>Apellido Cliente</Label>
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
        </div>
    )
}
export default FormOfClient;