import { Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SocketContext from "../../../Context/socket-context";
import ClientForm from "./ClientForm";
import { useTranslation } from "react-i18next";

const EditarClient = () => {

    const { t } = useTranslation('translation');
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
            <h1>{t('client_list.editar')}</h1>
            {/* <h2>En proceso ...</h2> */}
            {loaded &&
            <ClientForm read={'http://localhost:3000/clients' ? [1,1,1,1,1,1] : [0,0,0,0,0,0]} c={client} onSubmit={editarClient} label={t('client_list.btn_e')}/>
            }
            <Button color="primary" onClick={() => navigate('/Home')}>{t('client_list.button')}</Button>
            </>}
        </div>
    )
}
export default EditarClient;