import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

const InformesCompras = () => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();

    const {login} = useContext(SocketContext);

    return (
        <div>
            {login && <>
            <h1>{t('informe_compra.h1')}</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>{t('informe_compra.button')}</Button>
            </>}
        </div>
    )
}
export default InformesCompras;