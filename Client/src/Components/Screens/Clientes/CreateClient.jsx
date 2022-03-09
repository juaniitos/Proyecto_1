import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import SocketContext from "../../../Context/socket-context";
import ClientForm from "./ClientForm";

const CreateClient = () => {

    const {login} = useContext(SocketContext);
    const navigate = useNavigate();
    const initialClient = {
        nombre: "",
        apellido: "",
        ruc: "",
        email: "",
        saldo: "",
        activo: ""
    }
    const [newClient, setNewClient] = useState(initialClient);
    
    const addClient = (e, c) => {
        e.preventDefault();
        console.log(c)
        axios.post('/api/clientRegister', c)
            .then(res => {
                console.log(res)
                setNewClient(initialClient)
                navigate('/clientList')                
            })
            .catch(error => console.log("Error", error))
    }

    return (
        <div>
            {login && <>
            <h1>Crear Cliente</h1>
            {/* <h2>En proceso ...</h2> */}
            <ClientForm read={[1,1,1,1,1,1]} c={newClient} onSubmit={addClient} label={'Crear'}/>
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
            </>}
        </div>
    )
}
export default CreateClient;