import React, {useState} from "react";
import Dialog from "./dialog";

const  DialogExample1 = () => {
    const [x, setX] = useState(false)

    return (
        <div>
            <div style={{position: 'relative', zIndex: 10, }}>
                <h1>example 1</h1>
                <button onClick={() => setX(!x)}>click</button>
                <Dialog visible={x} buttons={
                    [
                        <button onClick={() => {
                            setX(false);
                        }}>1</button>,
                        <button onClick={() => {
                            setX(false);
                        }}>2</button>
                    ]
                } onClose={() => {
                    setX(false);
                }}>
                    <strong>hi</strong>
                </Dialog>
            </div>
        </div>
    )
}

export default DialogExample1