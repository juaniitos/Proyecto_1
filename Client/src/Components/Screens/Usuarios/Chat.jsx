import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Form, Button, Input } from 'reactstrap';
import { useTranslation } from "react-i18next";

const Chat = () => {

    const { t } = useTranslation('translation');
    const [yourId, setYourId] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('/');

        socketRef.current.on("your id", id => {
            setYourId(id);
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
        const messageObject = {
            body: message,
            id: yourId,
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject);
    }

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    return(
        <div className='page'>
            <p className='p_chat'>{t('chat.p')}</p>
            <div className='container_chat'>
                {messages.map((message, index) => {
                    if(message.id === yourId) {
                        return(
                            <div className='myRow' key={index}>
                                <div className='myMessage'>
                                    {message.body}
                                </div> 
                            </div>
                        )
                    }
                    return(
                        <div className='partnerRow' key={index}>
                            <div className='partnerMessage'>
                                {message.body}
                            </div> 
                        </div>
                    )
                })}
            </div>
            <Form className='f_chat' onSubmit={sendMessage}>
                <Input className='in_chat' value={message} onChange={handleChange} placeholder={t('chat.placeholder')} />
                <Button className='chat_btn'>{t('chat.button')}</Button>
            </Form>
        </div>
    )
};

export default Chat;