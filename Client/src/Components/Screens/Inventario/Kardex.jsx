import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import SocketContext from "../../../Context/socket-context";

const Kardex = () => {
    const {login} = useContext(SocketContext);
    const navigate = useNavigate();

    return (
        <div>
            {login && <>
            <h1>Kardex</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
            </>}
        </div>
    )
}
export default Kardex;