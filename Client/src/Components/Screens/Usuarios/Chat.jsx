import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { Form, Button, Input } from 'reactstrap';
import { useTranslation } from "react-i18next";
import SocketContext from '../../../Context/socket-context';

const Chat = (props) => {

    const { t } = useTranslation('translation');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState({
        emisor_id:'',
        receptor:'',
        emisor:'',
        mensaje:''
    });
    const { usuario } = useContext(SocketContext);

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('/');

        socketRef.current.on("message_" + usuario._id, (message) => {
            recieveMessage(message);
        })


        socketRef.current.on("message", (message) => {
            recieveMessage(message);
        })
    }, []);

    const recieveMessage = (message) => {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        message.emisor = usuario.name;
        message.emisor_id = usuario._id;
        message.receptor = props.input._id;
        
        socketRef.current.emit("send_message", message);
        setMessage({
            ...message, mensaje: ''
        });
    }

    const handleChange = (e) => {
        setMessage({
            ...message,
            mensaje: e.target.value
        });
    }

    return(
        <div className='page'>
            <p className='p_chat'>{t('chat.p')}</p>
            <div className='container_chat'>
                {messages.map((message, index) => {
                    if(message.emisor_id === usuario._id) {
                        return(
                            <div className='myRow' key={index}>
                                <div className='myMessage'>
                                    {message.emisor}:{message.mensaje}
                                </div> 
                            </div>
                        )
                    }
                    return(
                        <div className='partnerRow' key={index}>
                            <div className='partnerMessage'>
                                {message.emisor}:{message.mensaje}
                            </div> 
                        </div>
                    )
                })}
            </div>
            <Form className='f_chat' onSubmit={sendMessage}>
                <Input className='in_chat' value={message.mensaje} onChange={handleChange} placeholder={t('chat.placeholder')} />
                <Button className='chat_btn'>{t('chat.button')}</Button>
            </Form>
        </div>
    )
};

export default Chat;