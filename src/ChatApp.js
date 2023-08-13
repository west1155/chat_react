import io from 'socket.io-client';
import React, {useEffect, useState} from "react";
import './ChatScreen.css';



const ChatApp = () => {


    const [messages, setMessages] = useState(["Message1", "Message2", "Message3"]);
    const [chatText, setChatText] = useState("")
    const socket = io.connect('http://54.197.200.15:3001');



    useEffect(() => {
        // Listen for incoming messages
        socket.on('message', (chatText) => {
            setMessages((prevMessages) => [...prevMessages, chatText]);
        });

        // Clean up the event listener
        return () => {
            socket.off('message');
        };
    });

    const handleMessageChange = (e) => {
        setChatText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chatText.trim() !== '') {
            socket.emit('message', chatText);
            setChatText('');
        }
    };
    return <div className="bodybox">
            <div className="chatborder">
                {messages.map((message, index) => <li key={index}>{message}</li>)}
            </div>
            <form className="chat-input" onSubmit={handleSubmit}>
                <input type="text"
                       className="chat-input"
                       value={chatText}
                       onChange={handleMessageChange}
                       placeholder="Hi there! Type here to talk to me."/>
                <button type="submit">Send</button>
            </form>
        </div>
}

export default ChatApp;
