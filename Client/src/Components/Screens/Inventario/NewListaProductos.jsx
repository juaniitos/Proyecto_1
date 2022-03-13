import { Button } from "reactstrap";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import SocketContext from "../../../Context/socket-context";
import ListOfProducts from "./ListOfProducts";
import { useTranslation } from "react-i18next";

const NewListaProductos = () => {

    const { t } = useTranslation('translation');
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
            <h1>{t('lista_prod.h1')}</h1>
            <div>
                <div className="search">
                    <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    fullWidth
                    label={t('lista_prod.label')}
                    />
                </div>
                <ListOfProducts input={inputText}/>
                <Button color="primary" onClick={() => navigate('/Home')}>{t('lista_prod.button')}</Button>                
            </div>
            </>}
        </div>
    )
}
export default NewListaProductos;