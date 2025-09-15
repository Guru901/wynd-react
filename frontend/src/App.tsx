import { useEffect, useState } from "react";

function App() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const ws = new WebSocket("ws://localhost:3000");

      ws.onopen = () => {
        setWs(ws);
      };

      ws.onmessage = (event) => {
        setMessages((prev) => [...prev, event.data]);
      };
    })();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h1>Wynd + React minimal starting point</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="Type something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={() => ws?.send(input)}>Send</button>
        </div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
