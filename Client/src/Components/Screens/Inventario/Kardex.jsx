import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Kardex = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Kardex</h1>
            <h2>En proceso ...</h2>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
        </div>
    )
}
export default Kardex;