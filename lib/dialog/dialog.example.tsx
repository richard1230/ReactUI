import React ,{useState}from "react";
import Dialog from "./dialog";
export default ()=>{
    const [x,setX] = useState(false)
    return(
        <div>
            <button onClick={()=>setX(!x)}>click</button>
            <Dialog visible={x} buttons={
                [
                    <button onClick={()=>{setX(false);}}>1</button>,
                    <button onClick={()=>{setX(false);}}>2</button>
                ]
            } onClose={()=>{setX(false);}}>
                <strong>hi</strong>
            </Dialog>
        </div>
    )
}