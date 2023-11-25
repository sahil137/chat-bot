import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "./socket";
import UserMessage from "./components/user-message";
import BotMessage from "./components/bot-message";
function App() {
  const divRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function getChatMessages() {
    const res = await axios.get("http://localhost:8000/get-messages");
    setMessages(res.data.chatHistory);
  }

  const scrollToBottom = () => {
    const bottomDiv = document.getElementById("bottom-div");
    bottomDiv.scrollIntoView(false);
  };

  useEffect(() => {
    getChatMessages();
    socket.on("connect", () => {
      console.log("Client Connected");
    });
    socket.on("chat", (message) => {
      console.log("messages", messages);
      if (messages.pop() !== message.message) {
        setMessages((messages) => [
          ...messages,
          { text: message.message, sentByServer: true },
        ]);
      }
      scrollToBottom();
    });
  }, [messages]);

  function sendMessage() {
    scrollToBottom();
    socket.emit("chat", { message: input });
    setMessages((messages) => [
      ...messages,
      { sentByServer: false, text: input },
    ]);
    setInput("");
  }

  return (
    <div className="h-[800px] relative">
      <div className="flex flex-col justify-between w-[500px] h-[700px] overflow-y-auto relative">
        <div className="p-2">
          {messages.map((message, idx) => (
            <>
              {message.sentByServer ? (
                <>
                  <BotMessage key={idx} text={message.text} />
                </>
              ) : (
                <>
                  <UserMessage key={idx} text={message.text} />
                </>
              )}
            </>
          ))}
          <div id="bottom-div" ref={divRef}></div>
        </div>
      </div>
      <div className="flex w-[500px] gap-3 absolute bottom-0">
        <input
          type="text"
          value={input}
          className="basis-3/5 outline-none p-2"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="basis-2/5 border border-black"
          disabled={input === ""}
          onClick={sendMessage}
          type="button"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default App;
