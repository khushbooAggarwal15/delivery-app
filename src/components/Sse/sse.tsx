import {useState,useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal} from 'react'

const sse = () => {

const [data,setData]=useState<any>([]);

useEffect(()=>{

    const eventSource = new EventSource("https://3cb1-115-240-127-98.ngrok-free.app/sse",{withCredentials:true});
    

    eventSource.addEventListener("notice", (event) => {
        const parsedData= JSON.parse(event.data);
          console.log(event.data)
          setData((prevData:any)=>[...prevData, parsedData]);
       
      });
    
    // eventSource.onmessage=(event)=>{
    //     console.log("true")
    //     const parsedData= JSON.parse(event.data);
    //     console.log(event.data)
    //     setData((prevData:any)=>[...prevData, parsedData]);
    // }



    eventSource.onerror=(error)=>{
        console.error("SSE error",error);
    };

    return()=>{
        eventSource.close();
    }
    
},[]);



  return (
    <div>
    <h1>SSE data</h1>

     <ul>
        {data.map((item,index)=>(<li key={index}>{item.message}</li>))}
    </ul></div>
  )
}

export default sse
