import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col,Form,FormGroup,Input, Label } from "reactstrap";

const FormOfClient = (props) => {

    const [clients, setClients] = useState([]);
    const [infoCliente, setInfoCliente] = useState("");

    const [filteredClients, setFilteredClients] = useState([]);

    useEffect (() => {
        axios.get('/api/clients')
        .then(res => {
            // console.log("RES", res.data.clients);
            setClients(res.data.clients);
        })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        });
    },[]) 

    const cambioInfoCliente = (e) => {
        setInfoCliente(e.target.value)
    }

    useEffect(() => {
        filterClients(props.input)
    }, [props.input])

    const filterClients = (f) => {
        const filteredClients = clients.filter((c) => {
            if(c.apellido.toLowerCase().includes(props.input)){
                return c               
            }
        })
        setFilteredClients(filteredClients);
    }

    return(
        <div>
            <Form >
                <FormGroup row>
                    <Label for="nombre cliente" sm={2}>Nombre Cliente:</Label>
                    <Col sm={3}>
                        {/* {filteredClients.map((c, _id) => {
                            return(
                                <Input key={c._id} value={c.nombre} onChange={cambioInfoCliente}  />
                            )
                        })} */}
                        <Input /* key={c._id} */ value={props.input?.nombre} /* onChange={cambioInfoCliente} */  />
                    </Col>
                    <Label for="apellido cliente" sm={2}>Apellidos Cliente:</Label>
                    <Col sm={3}>
                        {/* {filteredClients.map((c, _id) => {
                            return(
                                <Input key={c._id}  value={props.input.apellido} onChange={cambioInfoCliente} />
                            )
                        })} */}
                        <Input /* key={c._id} */ value={props.input?.apellido} /* onChange={cambioInfoCliente} *//>
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Label for="identificacion" sm={2}  >ID:</Label>
                    <Col sm={3} md={6} >
                        {/* {filteredClients.map((c, _id) => {
                            return(
                                <Input key={c._id} value={props.input.ruc}  onChange={cambioInfoCliente} />
                            )
                        })} */}
                        <Input /* key={c._id} */ value={props.input?.ruc} /* onChange={cambioInfoCliente} *//>
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}
export default FormOfClient;