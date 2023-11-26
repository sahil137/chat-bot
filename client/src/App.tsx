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
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/get-messages`
    );
    setMessages(res.data.chatHistory);
  }

  function scrollToBottom() {
    const scrollableDiv = document.getElementById("bottom-div");
    scrollableDiv.scrollIntoView({
      behavior: "smooth",
    });
    // // Check if the scroll is already at the bottom
    // const isAtBottom =
    //   scrollableDiv.scrollHeight - scrollableDiv.scrollTop ===
    //   scrollableDiv.clientHeight;

    // // If not at the bottom, scroll to the bottom
    // if (!isAtBottom) {
    //   scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    // }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    });
  }, [messages]);

  function sendMessage() {
    socket.emit("chat", { message: input });
    setMessages((messages) => [
      ...messages,
      { sentByServer: false, text: input },
    ]);
    setInput("");
  }

  return (
    <div className="h-[800px] relative">
      <div className="flex flex-col justify-between w-[500px] h-[700px] overflow-y-scroll">
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
          <div className="h-1" id="bottom-div" ref={divRef}></div>
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
