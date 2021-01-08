import React from "react";
import  {alert, confirm} from "./dialog";

 const  DialogExample3= () => {

    return (
        <div>
            <div>
                <h1>example 3</h1>
                <button onClick={() => alert('1')}>alert</button>
                <button onClick={() => confirm('1', () => {
                    console.log('点击了yes');
                }, () => {
                    console.log('点击了no');
                })}
                >confirm
                </button>
            </div>

        </div>

    )
}

export default DialogExample3