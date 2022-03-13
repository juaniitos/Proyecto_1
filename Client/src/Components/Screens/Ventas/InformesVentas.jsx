import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InformesVentas = () => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();

    return (
        <div>
            <h1>{t('inf_venta.h1')}</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>{t('inf_venta.button')}</Button>
        </div>
    )
}
export default InformesVentas;