import { Button, Table } from "reactstrap";
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListOfProducts = (props) => {

    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const [filteredInputs, setFilteredInputs] = useState([]);

    const [btnActive, setBtnActive] = useState(-1);
    const [showImg, setShowImg] = useState(false);

    useEffect(() =>{
        axios.get('/api/products')
            .then(res => {
                // console.log("RES", res.data.products);
                setInputs(res.data.products);
                setFilteredInputs(res.data.products);
                setLoaded(true);
        })
            .catch (err => {
                console.log("NO FUNCIONA", err)
            })
    }, [])

    const deleteProduct = (_id) => {
        axios.delete('/api/products/delete/' + _id)
        .then(res => {
            setInputs(inputs.filter(p => p._id !== _id));
        })
        .catch(err => {
            console.log(err)
        })
    }

    // const agrandarImg = (_id) => {
    //     if(btnActive == _id){
    //         setBtnActive(-1);
    //     } else {
    //         setBtnActive(_id);
    //     }
    // }

    const mostrarImg = (_id) => {
        setBtnActive(_id)
        setShowImg(!showImg);
    }

    useEffect(() => {
        filterInputs(props.input)
    }, [props.input])

    const filterInputs = (f) => {
        const filteredInputs = inputs.filter((p) => {
            if(p.descripcion.toLowerCase().includes(props.input)){
                return p               
            }
        })
        setFilteredInputs(filteredInputs);
    }

    // const getPaginationGroup = () => {
    //     let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    //     return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    //   };

    return (
        <div>
            <Table striped className="tableProducts">
                <thead>
                    <tr>
                        <th>{t('lista_prod.th_a')}</th>
                        <th>{t('lista_prod.th_b')}</th>
                        <th>{t('lista_prod.th_c')}</th>
                        <th>{t('lista_prod.th_d')}</th>
                        <th>{t('lista_prod.th_e')}</th>
                        <th>{t('lista_prod.th_f')}</th>
                        <th>{t('lista_prod.th_g')}</th>
                    </tr>
                </thead>
                {loaded && <>
                <tbody>
                    {filteredInputs.map((p, _id) => { 
                        return(
                            <tr key={p._id}>
                                <td>{p.codigo}</td>
                                <td>{p.descripcion}</td>
                                <td>{p.cantidad}</td>
                                <td>{p.precio}</td>
                                <td>{p.destacado == true ? `${t('lista_prod.form_dest')}` : `${t('lista_prod.form_no_dest')}`}</td>
                                <td><img className="btn_img" onClick={() => mostrarImg(_id)} src={p.imgUrl} alt="imagen producto"/></td>  
                                {/* <td><img className={btnActive == _id ? "btn_img.active" : "btn_img"} onClick={() => agrandarImg(_id)} src={p.imgUrl} alt="imagen producto"/></td>   */}
                                {/* <td><img className="img_prod" src={p.imgUrl} alt="imagen producto"/></td>                                                          */}
                                <td><Button color="success" onClick={() => navigate('/item/editar/' + p._id)}>{t('lista_prod.btn_ed')}</Button>&nbsp;&nbsp;<Button color="danger" onClick={() => {deleteProduct(p._id)}}>{t('lista_prod.btn_del')}</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
                {/* <Stack spacing={2}>
                    <Pagination count={10} color="primary" />
                </Stack> */}
            </>}
            </Table> 
            {btnActive !== -1 &&
            <div className="div_img" onClick={() => mostrarImg(-1)} style={showImg ? {display: 'flex'} : {display: 'none'}}><img src={inputs[btnActive].imgUrl}/></div>}           
        </div>
    )
}
export default ListOfProducts;