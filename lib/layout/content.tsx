import React from 'react'
import scopedClassMaker from "../classes";

const sc = scopedClassMaker('gu-layout')

const Content: React.FunctionComponent = () => {
    return (
        <div className={sc('content')}>
            content
        </div>
    )
};


export default Content;