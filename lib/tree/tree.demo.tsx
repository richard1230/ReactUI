import React, {Fragment} from 'react';
import Demo from "../../demo";
import TreeExample from "./tree.example";

const TreeDemo=()=>{
    return(
        <Fragment>
            <Demo code={require('!!raw-loader!./tree.example.tsx').default}>
                <TreeExample/>
            </Demo>
        </Fragment>
    )
}

export default TreeDemo