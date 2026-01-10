import { useEffect, useRef, useState } from "react";

type GetActiveClassId = {
  success: string;
  data: {
    classId: string;
  };
};

const AttendClass = () => {
  const wsRef = useRef<WebSocket | null>(null);
  const [studentCount, setStudentCount] = useState(0);
  const [activeClassId, setActiveClassId] = useState("");

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

  async function getActiveClassId() {
    try {
      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/getactiveclass"
      );
      const jsonRes: GetActiveClassId = await resp.json();
      setActiveClassId(jsonRes.data.classId);
    } catch (err) {
      console.log("error while fetching active class id", err);
    }
  }

  async function CreateNewClass() {
    try {
      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/createnewclass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            className: "Alice",
          }),
        }
      );

      const data = await resp.json();
      console.log(data);
    } catch (err) {
      console.log("error while creating new class", err);
    }
  }

  async function JoinClass() {
    try {
      const resp = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/joinclass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "123",
            className: "Alice",
          }),
        }
      );

      const data = await resp.json();
      console.log(data);
    } catch (err) {
      console.log("error while creating new class", err);
    }
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

      <button onClick={getActiveClassId} className="border py-px-4">
        Get active class id
      </button>

      {activeClassId !== "" && <div>active class id is {activeClassId}</div>}
      {activeClassId === "" && <div>No active classes at the moment</div>}

      <button onClick={CreateNewClass} className="border py-px-4">
        Create Class
      </button>

      <button onClick={JoinClass} className="border py-px-4">
        Join Class
      </button>
    </div>
  );
};

export default AttendClass;
