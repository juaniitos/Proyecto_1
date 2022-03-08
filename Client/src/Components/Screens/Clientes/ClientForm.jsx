import { useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";

const ClientForm = ({c, onSubmit, label, read}) => {

    const initialClient = {
        nombre: c.nombre ? c.nombre : "",
        apellido: c.apellido ? c.apellido : "",
        ruc: c.ruc ? c.ruc : "0",
        email: c.email ? c.email : "",
        saldo: c.saldo ? c.saldo : "0",
        activo: c.activo ? c.activo : true, 
        inactivo: c.inactivo ? c.inactivo : false   
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
            <Label>Apellido:</Label>
            <Input readOnly={read[1] == 0 ? true : false} type="text" name="apellido" value={cliente.apellido} onChange={change} required  placeholder="Inserte apellido de cliente"/>
            <Label>RUC:</Label>
            <Input readOnly={read[2] == 0 ? true : false} type="number" name="ruc" value={cliente.ruc} onChange={change} required  placeholder="Inserte RUC de cliente"/>
            <Label>Email:</Label>
            <Input readOnly={read[3] == 0 ? true : false} type="email" name="email" value={cliente.email} onChange={change} required placeholder="Inserte email de cliente"/>
            <Label>Saldo de Cuenta:</Label>
            <Input readOnly={read[4] == 0 ? true : false} type="number" name="saldo" value={cliente.saldo} onChange={change} required placeholder="Inserte saldo de cliente"/>
            <Label>Activo:</Label>
            <Input className="active" readOnly={read[5] == 0 ? true : false} type="checkbox" name="activo" checked={cliente.activo} onChange={changeCheck} />
            <Label>Inactivo:</Label>
            <Input readOnly={read[6] == 0 ? true : false} type="checkbox" name="inactivo" checked={cliente.inactivo} onChange={changeCheck} />
            <br/>
            <Button type="submit" color="success" >{label}</Button>
            <br/><br/>
        </Form>
    )
}
export default ClientForm;