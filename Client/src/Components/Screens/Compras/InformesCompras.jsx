import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const InformesCompras = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>InformesCompras</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
        </div>
    )
}
export default InformesCompras;