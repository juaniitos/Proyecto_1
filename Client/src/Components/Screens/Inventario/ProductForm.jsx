import { useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { useTranslation } from "react-i18next";

const ProductForm = ({p, onSubmit, label, read}) => {

    const { t } = useTranslation('translation');

    const initialProduct = {
        codigo: p.codigo ? p.codigo : "",
        descripcion: p.descripcion ? p.descripcion : "",
        precio: p.precio ? p.precio : 0,
        cantidad: p.cantidad ? p.cantidad : 0,
        marca: p.marca ? p.marca : "",
        caracteristicas: p.caracteristicas ? p.caracteristicas : "",
        costo: p.costo ? p.costo : 0,
        imgUrl: p.imgUrl ? p.imgUrl : "",
        destacado: p.destacado ? p.destacado : ""     
    }

    const [product, setProduct] = useState(initialProduct);

    const change = (e) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    }

    const changeCheck = (e) => {
        const {name, checked} = e.target;
        setProduct({
            ...product,
            [name]: checked
        });
    }

    return(
        <Form onSubmit={(e) => onSubmit(e, product) }>
            <Label>{t('product_form.p_label_a')}</Label>
            <Input readOnly={read[0] == 0 ? true : false} type="text" name="codigo" value={product.codigo} onChange={change} required  placeholder={t('product_form.placeholder_a')}/>
            <Label>{t('product_form.p_label_b')}</Label>
            <Input readOnly={read[1] == 0 ? true : false} type="text" name="descripcion" value={product.descripcion} onChange={change} required  placeholder={t('product_form.placeholder_b')}/>
            <Label>{t('product_form.p_label_c')}</Label>
            <Input readOnly={read[2] == 0 ? true : false} type="number" name="precio" value={product.precio} onChange={change} required  placeholder={t('product_form.placeholder_c')}/>
            <Label>{t('product_form.p_label_d')}</Label>
            <Input readOnly={read[3] == 0 ? true : false} type="number" name="cantidad" value={product.cantidad} onChange={change} placeholder={t('product_form.placeholder_d')}/>
            <Label>{t('product_form.p_label_e')}</Label>
            <Input readOnly={read[4] == 0 ? true : false} type="text" name="marca" value={product.marca} onChange={change} required placeholder={t('product_form.placeholder_e')}/>
            <Label>{t('product_form.p_label_f')}</Label>
            <Input readOnly={read[5] == 0 ? true : false} type="text" name="caracteristicas" value={product.caracteristicas} onChange={change} placeholder={t('product_form.placeholder_f')}/>
            <Label>{t('product_form.p_label_g')}</Label>
            <Input readOnly={read[6] == 0 ? true : false} type="number" name="costo" value={product.costo} onChange={change} placeholder={t('product_form.placeholder_g')}/>
            <Label>{t('product_form.p_label_h')}</Label>
            <Input readOnly={read[7] == 0 ? true : false} type="text" name="imgUrl" value={product.imgUrl} onChange={change} placeholder={t('product_form.placeholder_h')}/>
            <FormControl component="fieldset" variant="standard">
                <FormLabel component="legend">{t('product_form.form_label')}</FormLabel>
                <FormGroup>
                    <FormControlLabel
                    readOnly={read[8] == 0 ? true : false}
                    control={
                        <Switch checked={product.destacado} onChange={changeCheck} name="destacado" />
                    }
                    label={product.destacado == true ? `${t('product_form.form_act')}` : `${t('product_form.form_no_act')}`}
                    />
                </FormGroup>
                <FormHelperText>{t('product_form.form_help')}</FormHelperText>
            </FormControl>
            <br/>
            <Button type="submit" color="success" >{label}</Button>
            <br/><br/>
        </Form>
    )
}
export default ProductForm;