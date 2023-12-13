"use client";
import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
} from "react";

const sse = () => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://192.168.11.196:3311/sse");

    eventSource.onopen = (e) => {
      console.log(e);
      console.log("The connection has been established.");
    };

    eventSource.onmessage = (event) => {
      console.log("true");

      console.log(event.data);
      setData((prevData: any) => [...prevData, event.data]);
      console.log(data);
    };

    eventSource.onerror = (error) => {
      console.error("SSE error", error);
    };

    return () => {
      eventSource.close();
      console.log("The connection has been disconnected.");
    };
  }, []);

  return (
    <div>
      <h1>SSE data</h1>

      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default sse;
