import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductTable = ({ths, inputs, deleteProduct, loaded, imagen}) =>{

    const { t } = useTranslation('translation');
    const navigate = useNavigate();

    return (
        <Table striped className="tableProducts">
        <thead>
            <tr>
                {console.log(ths)}
                {ths.map((t, index) => {
                return(
                    <th>{t.th}</th>
                    )
                })}
                {/* <th>Imagen de Producto</th> */}
                <th>{t('product_table.p_th')}</th>
             </tr>
        </thead>
        {loaded && <>
        <tbody>
            {inputs.map((p, _id) => { 
                return(
                    <tr key={p._id}>
                        {ths.map((t)=>{
                            return(
                            <td>{p[t.key]}</td>                            
                            )
                        })}
                        {/* <td><img className="img_prod" src={imagen} alt="imagen producto"></img></td> */}
                        <td><Button color="success" onClick={() => navigate('/item/editar/' + p._id)}>{t('product_table.p_th_btn_a')}</Button>&nbsp;&nbsp;<Button color="danger" onClick={() => {deleteProduct(p._id)}}>{t('product_table.p_th_btn_b')}</Button></td>
                    </tr>
                )
            })}
        </tbody>
        </>}
    </Table>

    )
}
export default ProductTable;