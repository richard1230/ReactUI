import React, {Fragment} from 'react';
import Demo from "../../demo";
import CitySelectExample from "./citySelect.example";

const CitySelectDemo =()=>{
    return (
        <Fragment>
            <Demo code={require('!!raw-loader!./citySelect.example.tsx').default}>
                <CitySelectExample/>
            </Demo>
        </Fragment>
    )
}

export default CitySelectDemo