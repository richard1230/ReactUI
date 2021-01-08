import React, {Fragment} from 'react';
import Demo from "../../demo";
import ScrollExample from "./scroll.example";

const ScrollDemo = ()=>{
    return(
        <Fragment>
            <Demo code={require('!!raw-loader!./scroll.example.tsx').default}>
                <ScrollExample/>
            </Demo>
        </Fragment>

    )
}

export default ScrollDemo