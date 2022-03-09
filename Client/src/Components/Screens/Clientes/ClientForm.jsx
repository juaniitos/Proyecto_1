import React, { useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

const ClientForm = ({c, onSubmit, label, read}) => {

    const initialClient = {
        nombre: c.nombre ? c.nombre : "",
        apellido: c.apellido ? c.apellido : "",
        ruc: c.ruc ? c.ruc : "0",
        email: c.email ? c.email : "",
        saldo: c.saldo ? c.saldo : "0",
        activo: c.activo ? c.activo : true  
    }

    const [cliente, setCliente] = useState(initialClient);

    const change = (e) => {
        const {name, value} = e.target;
        setCliente({
            ...cliente,
            [name]: value
        });
    }

    const changeCheck = (e) => {
        const {name, checked} = e.target;
        setCliente({
            ...cliente,
            [name]: checked
        });
    }

    return(
        <Form onSubmit={(e) => onSubmit(e, cliente) }>
            <Label>Nombre:</Label>
            <Input readOnly={read[0] == 0 ? true : false} type="text" name="nombre" value={cliente.nombre} onChange={change} required  placeholder="Inserte nombre de cliente"/>
            <Label>Apellidos:</Label>
            <Input readOnly={read[1] == 0 ? true : false} type="text" name="apellido" value={cliente.apellido} onChange={change} required  placeholder="Inserte apellido de cliente"/>
            <Label>RUC:</Label>
            <Input readOnly={read[2] == 0 ? true : false} type="number" name="ruc" value={cliente.ruc} onChange={change} required  placeholder="Inserte RUC de cliente"/>
            <Label>Email:</Label>
            <Input readOnly={read[3] == 0 ? true : false} type="email" name="email" value={cliente.email} onChange={change} required placeholder="Inserte email de cliente"/>
            <Label>Saldo de Cuenta:</Label>
            <Input readOnly={read[4] == 0 ? true : false} type="number" name="saldo" value={cliente.saldo} onChange={change} required placeholder="Inserte saldo de cliente"/>
            <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">Estado de Cliente</FormLabel>
                <FormGroup>
                    <FormControlLabel
                    readOnly={read[5] == 0 ? true : false}
                    control={
                        <Switch checked={cliente.activo} onChange={changeCheck} name="activo" />
                    }
                    label={cliente.activo == true ? 'Activo' : 'Inactivo'}
                    />
                </FormGroup>
                <FormHelperText>Formulario completo</FormHelperText>
            </FormControl>
            <br/>
            <Button type="submit" color="success" >{label}</Button>
            <br/><br/>
        </Form>
    )
}
export default ClientForm;