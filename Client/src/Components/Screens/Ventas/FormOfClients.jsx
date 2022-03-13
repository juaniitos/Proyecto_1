import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col,Form,FormGroup,Input, Label } from "reactstrap";
import { useTranslation } from "react-i18next";

const FormOfClient = (props) => {

    const { t } = useTranslation('translation');
    const [clients, setClients] = useState([]);

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

    return(
        <div>
            <Form >
                <FormGroup row>
                    <Label for="nombre cliente" sm={2}>{t('form_of_client.label_a')}</Label>
                    <Col sm={3}>
                        <Input value={props.input?.nombre} />
                    </Col>
                    <Label for="apellido cliente" sm={2}>{t('form_of_client.label_b')}</Label>
                    <Col sm={3}>
                        <Input value={props.input?.apellido} />
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Label for="identificacion" sm={2} >{t('form_of_client.label_c')}</Label>
                    <Col sm={3} md={6} >
                        <Input value={props.input?.ruc} />
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}
export default FormOfClient;