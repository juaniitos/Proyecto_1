import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SocketContext from "../../../Context/socket-context";

const InformesCompras = () => {
    const navigate = useNavigate();

    const {login} = useContext(SocketContext);

    return (
        <div>
            {login && <>
            <h1>InformesCompras</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
            </>}
        </div>
    )
}
export default InformesCompras;