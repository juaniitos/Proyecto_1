import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import SocketContext from "../../../Context/socket-context";

const OrdenCompra = () => {
    const {login} = useContext(SocketContext);
    const navigate = useNavigate();
    return (
        <div>
            {login && <>
            <h1>OrdenCompra</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
            </>}
        </div>
    )
}
export default OrdenCompra;