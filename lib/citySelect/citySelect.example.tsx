import React from "react";
import CitySelect from "./citySelect";
import './citySelect.scss'


const CitySelectExample: React.FC =()=>{

    return(
        <div>
            <h2>第一个例子</h2>
            <CitySelect>
                选择城市
            </CitySelect>
        </div>
    )
}

export default CitySelectExample