import React from 'react'
import {scopedClassMaker} from "../helpers/classes";

const sc = scopedClassMaker('gu-layout')


const Header: React.FunctionComponent = () => {
    return (
        <div className={sc('header')}>
            header
        </div>
    )
};


export default Header;