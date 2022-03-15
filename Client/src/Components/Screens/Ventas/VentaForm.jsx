import axios from "axios";
import { useEffect, useState } from "react";
import { Col,Form,FormGroup,Input } from "reactstrap";
import { useTranslation } from "react-i18next";

const VentaForm = (props) => {

    const { t } = useTranslation('translation');
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
    const [ctd, setCtd] = useState(0);

    useEffect(() => {
        let new_price = props.input.precio * ctd;
        if(isNaN(new_price)){
            new_price = 0
        }
        setPrice(new_price)
        props.updatePrice(new_price, props.index)
    }, [ctd])

    useEffect (() => {
        axios.get('/api/products')
        .then(res => {
            // console.log("RES", res.data.clients);
            setProducts(res.data.products);
        })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        });
    }, [])

    return(
        <div>
            <Form>
                <FormGroup row>
                    <Col md={3}>
                        <Input id="codigo" name="codigo" placeholder={t('venta_form.placeholder_a')}
                        type="text" value={props.input?.codigo} readOnly />
                    </Col>
                    <Col md={3}>
                        <Input id="descripcion" name="descripcion" placeholder={t('venta_form.placeholder_b')}
                        type="text" value={props.input?.descripcion} readOnly />
                    </Col>
                    <Col md={2}>
                        <Input id="cantidad" name="cantidad" placeholder={t('venta_form.placeholder_c')} type="number"
                        onChange={(e) => {setCtd(e.target.value)}}
                        value={ctd} min={1} />
                    </Col>
                    <Col md={2}>
                        <Input id="precio" name="precio" placeholder={t('venta_form.placeholder_d')} type="number"
                        value={props.input?.precio} min={0} readOnly />
                    </Col>
                    <Col md={2}>
                        <Input id="total" name="total" placeholder="0" type="number" 
                        value={price} readOnly  />
                    </Col>
                </FormGroup>
            </Form>
        </div>
    )
}
export default VentaForm;