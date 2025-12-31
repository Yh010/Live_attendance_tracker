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
      setMsgs(event.data);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {/* for now connect to backend when component mounts, later change this to click of button */}
      {/* <button className="border px-4 py-2" onClick={ConnectToClass}>
        Attend class
      </button> */}
      <div>Messages are</div>
      <div>{msgs}</div>
    </div>
  );
};

export default AttendClass;
