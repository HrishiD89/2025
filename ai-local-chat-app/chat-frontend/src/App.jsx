import { useState } from "react";
import axios from "axios";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I’m your local AI assistant 🤖" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/chat", { message: input });

      setMessages([...newMessages, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "⚠️ Error connecting to AI" }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-md ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-300 text-black self-start mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className="flex p-2 bg-white border-t">
        <input
          className="flex-1 border p-2 rounded-lg mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
