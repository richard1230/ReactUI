import React, {useState} from "react";
import Dialog from "./dialog";

const  DialogExample2= () => {
    const [y, setY] = useState(false)

    return (
        <div>

            <div>
                <h1>example 2</h1>
                <button onClick={() => setY(!y)}>click</button>
                <Dialog visible={y} closeOnClickMask={true} buttons={
                    [
                        <button onClick={() => {
                            setY(false);
                        }}>1</button>,
                        <button onClick={() => {
                            setY(false);
                        }}>2</button>
                    ]
                } onClose={() => {
                    setY(false);
                }}>
                    <strong>hi</strong>
                </Dialog>
            </div>

        </div>

    )
}

export default DialogExample2