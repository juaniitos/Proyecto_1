import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionItem, AccordionHeader, Button, AccordionBody, Card, CardTitle, CardText } from "reactstrap";
import SocketContext from '../Context/socket-context';

const Home = () => {
    const [indice, setIndice] = useState(1);
    const navigate = useNavigate();
    const { t } = useTranslation('translation');

    const {login} = useContext(SocketContext);

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
            <div className='template-container' >
                {/* {console.log(props.user)} */}
                <div className='template-left-side'>
                    <div className="css-1pv7ovc">
                        <div className="MuiAvatar-root MuiAvatar-circular css-inlwhr">
                            <img alt="Minimal UI" src="https://res.cloudinary.com/minimal-ui/image/upload/v1614655910/upload_minimal/avatar/minimal_avatar.jpg" className="MuiAvatar-img css-1hy9t21"/>
                        </div>
                        <div className="MuiBox-root css-k7os9j">
                            {/* <h6 > {props.user.name} </h6> */}
                            <p className="MuiTypography-root MuiTypography-body2 MuiTypography-noWrap css-10n697b">{t("home.typography")}</p>
                        </div>
                    </div>
                    <div className="barraLat">
                        <Accordion toggle={toggle} open={indice}>
                            <AccordionItem >
                                <AccordionHeader targetId="1">{t("home.accordion_header_1")}</AccordionHeader>
                                <AccordionBody accordionId="1">
                                    <Button color='#ffffff' onClick={ () => navigate('/ordenventa')}>{t("home.accordion_body_button_1a")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('/ordenventa')}>{t("home.accordion_body_button_1b")}</Button><br></br>
                                    {/* <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_1c")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_1d")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_1e")}</Button> */}
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem >
                                <AccordionHeader targetId="2">{t("home.accordion_header_2")}</AccordionHeader>
                                <AccordionBody accordionId="2">
                                    <Button color='#ffffff' onClick={ () => navigate('/item')}>{t("home.accordion_body_button_2a")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('/products')}>{t("home.accordion_body_button_2b")}</Button><br></br>
                                    {/* <Button color='#ffffff' onClick={ () => navigate('/precios')}>{t("home.accordion_body_button_2?")}</Button><br></br> */}
                                    {/* <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_2c")}</Button> */}
                                    {/* <Button color='#ffffff' onClick={ () => navigate('/kardex')}>{t("home.accordion_body_button_2d")}</Button> */}
                                    {/* <AccordionHeader targetId="2">{t("home.accordion_header_2+")}</AccordionHeader>
                                    <AccordionBody accordionId="2">
                                        <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_2+a")}</Button><br></br>
                                        <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_2+b")}</Button><br></br>
                                    </AccordionBody> */}
                                </AccordionBody>
                            </AccordionItem>
                            {/* <AccordionItem >
                                <AccordionHeader targetId="3">{t("home.accordion_header_3")}</AccordionHeader>
                                <AccordionBody accordionId="3">
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_3a")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('/ordencompra')}>{t("home.accordion_body_button_3b")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_3c")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_3d")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_3e")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('/informescompras')}>{t("home.accordion_body_button_3f")}</Button><br></br>
                                </AccordionBody>
                            </AccordionItem> */}
                            {/* <AccordionItem >
                                <AccordionHeader targetId="4">{t("home.accordion_header_4")}</AccordionHeader>
                                <AccordionBody accordionId="4">
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_4a")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_4b")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_4c")}</Button><br></br>
                                    <AccordionHeader targetId="4">{t("home.accordion_header_4+")}</AccordionHeader>
                                    <AccordionBody accordionId="4">
                                        <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_4+a")}</Button><br></br>
                                        <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_4+b")}</Button><br></br>
                                    </AccordionBody>
                                </AccordionBody>
                            </AccordionItem> */}
                            <AccordionItem >
                                <AccordionHeader targetId="5">{t("home.accordion_header_5")}</AccordionHeader>
                                <AccordionBody accordionId="5">
                                <Button color='#ffffff' onClick={ () => navigate('/client')}>{t("home.accordion_body_button_5a")}</Button><br></br>
                                <Button color='#ffffff' onClick={ () => navigate('/clientList')}>{t("home.accordion_body_button_5b")}</Button><br></br>
                                {/* <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_5c")}</Button>
                                <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_5d")}</Button> */}
                                {/* <AccordionHeader targetId="5">{t("home.accordion_header_5+")}</AccordionHeader>
                                <AccordionBody accordionId="5">
                                    <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_5+a")}</Button><br></br>
                                    <Button color='#ffffff' onClick={ () => navigate('/clientList/NoActive')}>{t("home.accordion_body_button_5?")}</Button><br></br>
                                </AccordionBody> */}
                                </AccordionBody>
                            </AccordionItem>
                            <AccordionItem >
                                <AccordionHeader targetId="6">{t("home.accordion_header_6")}</AccordionHeader>
                                <AccordionBody accordionId="6">
                                    {/* <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_6a")}</Button><br></br> */}
                                    {/* <Button color='#ffffff' onClick={ () => navigate('#')}>{t("home.accordion_body_button_6b")}</Button><br></br> */}
                                    {/* <AccordionHeader targetId="6">{t("home.accordion_header_6+")}</AccordionHeader> */}
                                    <AccordionBody accordionId="6">
                                        <Button color='#ffffff' onClick={ () => navigate('/changePassword')}>{t("home.accordion_body_button_6+a")}</Button><br></br>
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
                            {t("home.card_title_a")}
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
                            <Button id="control-outline" type="checkbox" name="outline" onClick={totalMonth}>{t("home.card_button_a")}</Button>
                            <Button id="control-outline" type="checkbox" name="outline">{t("home.card_button_b")}</Button>
                        </div>
                        <CardTitle tag="h5">
                            {t("home.card_title_b")}
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
                                {t("home.card_title_c")}
                            </CardTitle>
                            <CardText>
                                {t("home.card_title_d")}
                            </CardText>
                            {/* <Button>
                                {t("home.card_title_e")}
                            </Button> */}
                        </Card>
                    </div>
                </div>
            </div>  
            </>}     
        </div>
    )
}

export default Home;