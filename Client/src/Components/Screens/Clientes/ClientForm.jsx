import React, { useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { useTranslation } from "react-i18next";

const ClientForm = ({c, onSubmit, label, read}) => {

    const { t } = useTranslation('translation');

    const initialClient = {
        nombre: c.nombre ? c.nombre : "",
        apellido: c.apellido ? c.apellido : "",
        ruc: c.ruc ? c.ruc : 0,
        email: c.email ? c.email : "",
        saldo: c.saldo ? c.saldo : 0,
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
            <Label>{t('client_form.c_label_a')}</Label>
            <Input readOnly={read[0] == 0 ? true : false} type="text" name="nombre" value={cliente.nombre} onChange={change} required  placeholder={t('client_form.placeholder_a')}/>
            <Label>{t('client_form.c_label_b')}</Label>
            <Input readOnly={read[1] == 0 ? true : false} type="text" name="apellido" value={cliente.apellido} onChange={change} required  placeholder={t('client_form.placeholder_b')}/>
            <Label>{t('client_form.c_label_c')}</Label>
            <Input readOnly={read[2] == 0 ? true : false} type="number" name="ruc" value={cliente.ruc} onChange={change} required  placeholder={t('client_form.placeholder_c')}/>
            <Label>{t('client_form.c_label_d')}</Label>
            <Input readOnly={read[3] == 0 ? true : false} type="email" name="email" value={cliente.email} onChange={change} required placeholder={t('client_form.placeholder_d')}/>
            <Label>{t('client_form.c_label_e')}</Label>
            <Input readOnly={read[4] == 0 ? true : false} type="number" name="saldo" value={cliente.saldo} onChange={change} required placeholder={t('client_form.placeholder_e')}/>
            <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">{t('client_form.form_label')}</FormLabel>
                <FormGroup>
                    <FormControlLabel
                    readOnly={read[5] == 0 ? true : false}
                    control={
                        <Switch checked={cliente.activo} onChange={changeCheck} name="activo" />
                    }
                    label={cliente.activo == true ? `${t('client_form.form_act')}` : `${t('client_form.form_no_act')}`}
                    />
                </FormGroup>
                <FormHelperText>{t('client_form.form_help')}</FormHelperText>
            </FormControl>
            <br/>
            <Button type="submit" color="success" >{label}</Button>
            <br/><br/>
        </Form>
    )
}
export default ClientForm;