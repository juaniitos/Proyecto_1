import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

const OrdenCompra = () => {

    const { t } = useTranslation('translation');
    const {login} = useContext(SocketContext);
    const navigate = useNavigate();
    return (
        <div>
            {login && <>
            <h1>{t('orden_compra.h1')}</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>{t('orden_compra.button')}</Button>
            </>}
        </div>
    )
}
export default OrdenCompra;