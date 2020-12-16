import React from 'react'
import {scopedClassMaker} from "../helpers/classes";

const sc = scopedClassMaker('gu-layout')

//继承了HTMLAttributes这个对象，后面用Layout组件的时候就可以接受classname和style了
interface Props extends React.HTMLAttributes<HTMLElement>{

}

const Content: React.FunctionComponent<Props> = (props) => {
    const {className, ...rest}= props;
    return (
        <div className={sc('content',{extra:className})} {...rest}>
            {props.children}
        </div>
    )
};


export default Content;