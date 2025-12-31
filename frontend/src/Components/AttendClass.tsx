import { useEffect, useRef, useState } from "react";

const AttendClass = () => {
  const [msgs, setMsgs] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/attend");
    wsRef.current = ws;
    ws.onopen = () => {
      console.log("WebSocket is connected");
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "custom:response") {
        console.log(msg.payload);
      }
      setMsgs(event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  function sendEvent() {
    wsRef.current?.send(
      JSON.stringify({
        type: "custom",
        payload: null,
      })
    );
    console.log("data received is");
  }

  return (
    <div>
      {/* for now connect to backend when component mounts, later change this to click of button */}
      {/* <button className="border px-4 py-2" onClick={ConnectToClass}>
        Attend class
      </button> */}
      <div>Messages are</div>
      <div>{msgs}</div>
      <button onClick={sendEvent}>emit event</button>
    </div>
  );
};

export default AttendClass;
