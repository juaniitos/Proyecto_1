import { Button, Table } from "reactstrap";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListOfProducts = (props) => {
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

    return (
        <div>
            <Table striped className="tableProducts">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Imagen del producto</th>
                        <th>Acciones</th>
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
                                <td><img className="btn_img" onClick={() => mostrarImg(_id)} src={p.imgUrl} alt="imagen producto"/></td>  
                                {/* <td><img className={btnActive == _id ? "btn_img.active" : "btn_img"} onClick={() => agrandarImg(_id)} src={p.imgUrl} alt="imagen producto"/></td>   */}
                                {/* <td><img className="img_prod" src={p.imgUrl} alt="imagen producto"/></td>                                                          */}
                                <td><Button color="success" onClick={() => navigate('/item/editar/' + p._id)}>Editar</Button>&nbsp;&nbsp;<Button color="danger" onClick={() => {deleteProduct(p._id)}}>Eliminar</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </>}
            </Table> 
            {btnActive !== -1 &&
            <div className="div_img" onClick={() => mostrarImg(-1)} style={showImg ? {display: 'flex'} : {display: 'none'}}><img src={inputs[btnActive].imgUrl}/></div>}           
        </div>
    )
}
export default ListOfProducts;