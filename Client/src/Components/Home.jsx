import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionItem, AccordionHeader, Button, AccordionBody, Card, CardTitle, CardText } from "reactstrap";
import SocketContext from '../Context/socket-context';

const Home = () => {
    const [indice, setIndice] = useState(1);
    const navigate = useNavigate();

    const {login, setLogin} = useContext(SocketContext);

    const cerrarSesion = () => {
        localStorage.removeItem('USUARIO');
        setLogin(false);
        navigate("/")
    }

    const toggle = (i) =>{
        if (i === indice) {
            setIndice(1);
        } else {
            setIndice(i)
        }
    }
    const totalMonth = (e) => {
        <CardText>
                $961
        </CardText>
    }
    return(
        <div>
            {login && <>
            <Button className='header' color='#ffffff' onClick={cerrarSesion} >Cerrar Sesión</Button>
            <div className='template-container' >
                {/* {console.log(props.user)} */}
                <div className='template-left-side'>
                    <div className="css-1pv7ovc">
                        <div className="MuiAvatar-root MuiAvatar-circular css-inlwhr">
                            <img alt="Minimal UI" src="https://res.cloudinary.com/minimal-ui/image/upload/v1614655910/upload_minimal/avatar/minimal_avatar.jpg" className="MuiAvatar-img css-1hy9t21"/>
                        </div>
                        <div className="MuiBox-root css-k7os9j">
                            {/* <h6 > {props.user.name} </h6> */}
                            <p className="MuiTypography-root MuiTypography-body2 MuiTypography-noWrap css-10n697b">admin</p>
                        </div>
                    </div>
                    <div className="barraLat">
                        <Accordion toggle={toggle} open={indice}>
                            <AccordionItem >
                                <AccordionHeader targetId="1">Venta</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <Button color='#ffffff' onClick={ () => navigate('/ordenventa')}>Proforma</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('/ordenventa')}>Orden de venta</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Devolución</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Nota de crédito</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Informes de ventas</Button>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem >
                                <AccordionHeader targetId="2">Inventario</AccordionHeader>
                                <AccordionBody accordionId="2">
                                    <Button color='#ffffff' onClick={ () => navigate('/item')}>Crear Items</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('/products')}>Lista de productos</Button><br></br>
                                    {/* <Button color='#ffffff' onClick={ () => navigate('/precios')}>Lista de precios </Button><br></br> */}
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Revalorización de inventario </Button>
                                    <Button color='#ffffff' onClick={ () => navigate('/kardex')}>Kardex </Button>
                                    <AccordionHeader targetId="2">Operaciones de stock</AccordionHeader>
                                    <AccordionBody accordionId="2">
                                        <Button color='#ffffff' onClick={ () => navigate('#')}>Ingresos por ajuste</Button><br></br>
                                        <Button color='#ffffff' onClick={ () => navigate('#')}>Egresos por ajuste</Button><br></br>
                                    </AccordionBody>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem >
                                <AccordionHeader targetId="3">Compra</AccordionHeader>
                                <AccordionBody accordionId="3">
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Proforma</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('/ordencompra')}>Orden de compra </Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Entrada de mercancías</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Devolución </Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Nota de crédito</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('/informescompras')}>Informes de compras </Button><br></br>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem >
                                <AccordionHeader targetId="4">Finanzas</AccordionHeader>
                                <AccordionBody accordionId="4">
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Plan de cuentas </Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Libro mayor </Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Anular transacciones </Button><br></br>
                                    <AccordionHeader targetId="4">Informes financieros</AccordionHeader>
                                    <AccordionBody accordionId="4">
                                        <Button color='#ffffff' onClick={ () => navigate('#')}>ATS</Button><br></br>
                                        <Button color='#ffffff' onClick={ () => navigate('#')}>Diario de documentos</Button><br></br>
                                    </AccordionBody>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem >
                                <AccordionHeader targetId="5">Clientes</AccordionHeader>
                                <AccordionBody accordionId="5">
                                <Button color='#ffffff' onClick={ () => navigate('/client')}>Agregar Clientes </Button><br></br>
                                <Button color='#ffffff' onClick={ () => navigate('/clientList')}>Lista de clientes </Button><br></br>
                                <Button color='#ffffff' onClick={ () => navigate('#')}>Saldo de cuenta de cliente</Button>
                                <Button color='#ffffff' onClick={ () => navigate('#')}>Campaña </Button>
                                <AccordionHeader targetId="5">Informes de clientes</AccordionHeader>
                                <AccordionBody accordionId="5">
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Antiguedad de saldos</Button><br></br>
                                    {/* <Button color='#ffffff' onClick={ () => navigate('/clientList/NoActive')}>Clientes inactivos</Button><br></br> */}
                                </AccordionBody>
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem >
                                <AccordionHeader targetId="6">Usuario</AccordionHeader>
                                <AccordionBody accordionId="6">
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>Temas (estilos)</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}> Idioma</Button><br></br>
                                    <AccordionHeader targetId="6">Seguridad</AccordionHeader>
                                    <AccordionBody accordionId="6">
                                        <Button color='#ffffff' onClick={ () => navigate('#')}>Modificar clave de acceso</Button><br></br>
                                    </AccordionBody>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
                <div className='template-content'>
                    <Card
                        body
                        inverse
                        style={{
                        backgroundColor: '#333',
                        borderColor: '#333'
                        }}
                    >
                        <img className='image-card' src='https://berrydashboard.io/free/static/media/earning.b019e86a.svg' />
                        <CardTitle tag="h5">
                            Total Earning
                        </CardTitle>
                        <CardText>
                            $500
                        </CardText>
                    </Card>
                    <Card
                        body
                        color="primary"
                        inverse
                    >
                        <img className='image-card' src='https://berrydashboard.io/free/static/media/earning.b019e86a.svg' />
                        <div>
                            <Button id="control-outline" type="checkbox" name="outline" onClick={totalMonth}>Month</Button>
                            <Button id="control-outline" type="checkbox" name="outline">Year</Button>
                        </div>
                        <CardTitle tag="h5">
                            Total
                        </CardTitle>
                        <CardText>
                            $961
                        </CardText>
                    </Card>
                    <div className='stadistic' >
                        <Card
                            body
                            color="success"
                            inverse
                        >
                            <CardTitle tag="h5">
                                Special Title Treatment
                            </CardTitle>
                            <CardText>
                                With supporting text below as a natural lead-in to additional content.
                            </CardText>
                            <Button>
                                Button
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>  
            </>}     
        </div>
    )
}

export default Home;