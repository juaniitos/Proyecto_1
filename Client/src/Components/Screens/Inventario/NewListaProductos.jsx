import { Button } from "reactstrap";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SocketContext from "../../../Context/socket-context";
import ListOfProducts from "./ListOfProducts";

const NewListaProductos = () => {
    const navigate = useNavigate();

    const {login} = useContext(SocketContext);

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };

    return (
        <div>
            {login && <>
            <h1>Lista de Productos</h1>
            <div>
                <div className="search">
                    <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label="Buscar producto por su descripción"
                    />
                </div>
                <ListOfProducts input={inputText}/>
                <Button color="primary" onClick={() => navigate('/Home')}>Volver a Home</Button>                
            </div>
            </>}
        </div>
    )
}
export default NewListaProductos;