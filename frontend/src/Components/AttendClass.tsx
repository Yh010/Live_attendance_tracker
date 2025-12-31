import { useEffect, useRef, useState } from "react";

const AttendClass = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const [studentCount, setStudentCount] = useState(0);

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

      if (msg.type === "studentCount") {
        setStudentCount(msg.payload);
      }
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
      <div>Number of students live are {studentCount}</div>
      <button onClick={sendEvent}>emit event</button>

      <div>List of live students</div>
    </div>
  );
};

export default AttendClass;
