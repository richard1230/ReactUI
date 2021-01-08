import React from "react";
import  { modal} from "./dialog";


 const  DialogExample4= () => {

    const openModal = () => {
        //函数返回操作这个函数内部变量的api
        const Close = modal(<h1>你好
            <button onClick={() => {
                Close()
            }}>close</button>
        </h1>);
    }
    return (
        <div>
            <div>
                <h1>example 4</h1>
                <button onClick={openModal}>modal</button>
            </div>

        </div>

    )
}

export default DialogExample4