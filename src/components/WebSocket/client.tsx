import { useState, useEffect } from "react";
import io from "socket.io-client";

const SocketClient: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io("http://192.168.93.159:8080");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to the server");
    });

    newSocket.on("serverMessage", (receivedMessage: string) => {
      // Handle messages received from the server.
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    return () => {
      // Disconnect the socket when the component unmounts.
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.emit("clientMessage", message);
      setMessage("");
    }
  };

  return (
    <div>
      <div>
        <h2>Chat</h2>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default SocketClient;
// "use client";
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// export default function SocketClient() {
//   const [msg, setMsg] = useState<string[]>([]);

//   const [message, setMessage] = useState("");
//   const socket = io("http://192.168.93.159:8080");

//   useEffect(() => {
//     socket.on("connect", () => {
//       console.log("connnection establish");
//       console.log(socket.id);
//     });
//     socket.emit("serverMessage", (pmessage: string) => {
//       console.log("Message from the server", pmessage);
//       setMsg((prevMsg) => [...prevMsg, pmessage]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const handleSendMessage = () => {
//     socket.emit("clientMessage", message);
//     setMessage("");
//   };

//   return (
//     <div>
//       <p>Websockets</p>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={handleSendMessage}>Send</button>
//     </div>
//   );
// }
