import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SocketContext from "../../../Context/socket-context";
import ClientForm from "./ClientForm";

const EditarClient = () => {
    const {_id} = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const {login} = useContext(SocketContext);

    useEffect(() => {
        axios.get('/api/clients/' + _id)
            .then(res => {
                console.log(res)
                setClient(res.data.client);
                setLoaded(true);
            })
    }, [])

    const editarClient = (e, c) => {
        console.log(c);
        e.preventDefault();
        axios.put('/api/clients/update/'+ _id, c)
            .then(res => {             
                console.log(res);                
                navigate(-1)
            })
            .catch (err => {
                console.log(err)
            });
    }

    return (
        <div>
            {login && <>
            <h1>Editar Cliente</h1>
            <h2>En proceso ...</h2>
            {loaded &&
            <ClientForm read={'http://localhost:3000/clients' ? [1,1,1,1,1,1,1,1] : [0,0,0,0,0,0,0,0]} c={client} onSubmit={editarClient} label={'Editar'}/>
            }
            <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>
            </>}
        </div>
    )
}
export default EditarClient;