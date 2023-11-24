import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { socket } from "./socket";
function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Front end connected");
    });
    socket.on("chat", (message) => {
      console.log(message);
    });
    async function getChatMessages() {
      const res = await axios.get("http://localhost:8000/get-messages");
      console.log(res);
      setMessages(res.data.chatHistory);
    }
    getChatMessages();
  }, []);

  function sendMessage() {
    socket.emit("chat", { message: input });
    setMessages((messages) => [...messages, { role: "user", content: input }]);
    setInput("");
  }

  return (
    <>
      <div>
        {messages.map((message, idx) => (
          <>
            <div key={idx}>{message.text}</div>
          </>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button disabled={input === ""} onClick={sendMessage} type="button">
        Send Message
      </button>
    </>
  );
}

export default App;
