import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const OrdenCompra = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>OrdenCompra</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
        </div>
    )
}
export default OrdenCompra;