import { useState } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import { useTranslation } from "react-i18next";

const ProductForm = ({p, onSubmit, label, read}) => {

    const { t } = useTranslation('translation');

    const initialProduct = {
        codigo: p.codigo ? p.codigo : "",
        descripcion: p.descripcion ? p.descripcion : "",
        precio: p.precio ? p.precio : "0",
        cantidad: p.cantidad ? p.cantidad : "0",
        marca: p.marca ? p.marca : "",
        caracteristicas: p.caracteristicas ? p.caracteristicas : "",
        costo: p.costo ? p.costo : "0",
        imgUrl: p.imgUrl ? p.imgUrl : ""     
    }

    const [product, setProduct] = useState(initialProduct);

    const change = (e) => {
        const {name, value} = e.target;
        setProduct({
            ...product,
            [name]: value
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
            <br/>
            <Button type="submit" color="success" >{label}</Button>
            <br/><br/>
        </Form>
    )
}
export default ProductForm;