import React, { useState} from "react";
import ReactDOM from 'react-dom';

interface Props {
    
}

const CitySelect:React.FC<Props>=(props)=>{
    const [dialogVisible,setDialogVisible] = useState(false);
    const onClick = ()=>{
        setDialogVisible(true)
        console.log("dialogVisible: "+dialogVisible);
    }
    return(
        <>
        <div onClick={onClick}>{props.children}</div>
            {dialogVisible && <Dialog onClose={()=>setDialogVisible(false)} />}

     </>

    );
}

const Dialog:React.FC<{onClose:()=>void}>=(props)=>{
    return ReactDOM.createPortal(
        (<div className="fui-citySelect-dialog"
              onClick={props.onClose}
        >弹出内容</div>),document.body)

}

export default CitySelect