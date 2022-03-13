import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SocketContext from "../../../Context/socket-context";
import { useTranslation } from "react-i18next";

const Kardex = () => {

    const { t } = useTranslation('translation');
    const {login} = useContext(SocketContext);
    const navigate = useNavigate();

    return (
        <div>
            {login && <>
            <h1>{t('kardex.h1')}</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>{t('kardex.button')}</Button>
            </>}
        </div>
    )
}
export default Kardex;