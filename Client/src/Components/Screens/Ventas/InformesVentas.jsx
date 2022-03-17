import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import SocketContext from "../../../Context/socket-context";
import axios from "axios";

const InformesVentas = () => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();

    const [inputs, setInputs] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const {login} = useContext(SocketContext);

    useEffect(()=> {
        axios.get('/api/ventas')
        .then(res => {
            console.log("RES", res.data.ventas);
            setInputs(res.data.ventas); 
            setLoaded(true)
        })
        .catch (err => {
            console.log("NO FUNCIONA", err)
        })
    })

    return (
        <div>
            {login && <>
            <h1>{t('inf_venta.h1')}</h1>
            {/* <h2>En proceso ...</h2> */}
            <Table striped className="tableProducts">
                <thead>
                    <tr>
                        <th>{t('inf_venta.th_a')}</th>
                        <th>{t('inf_venta.th_b')}</th>
                        <th>{t('inf_venta.th_c')}</th>
                        <th>{t('inf_venta.th_d')}</th>
                    </tr>
                </thead>
                {loaded && <>
                <tbody>
                    {inputs.map((f, _id) => {
                        return(
                            <tr key={f._id}>
                                <td> {f.contador} </td>
                                <td> {f.nombre} </td>
                                <td> {f.apellido} </td>
                                <td> {f.total} </td>
                            </tr>
                        )
                    })}
                </tbody>
                
                </>}
            </Table>

            {/* {loaded && 
                <ul>
                    {inputs.map((i) => {
                        return(
                            <li >
                                {i}

                            </li>
                        )
                    })}
                </ul>
            }
            <ul>
                <li>

                </li>
            </ul> */}
            {/* <Button color="primary" onClick={() => navigate('/Home')}>{t('inf_venta.button')}</Button> */}
            </>}
        </div>
    )
}
export default InformesVentas;