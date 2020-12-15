import React, {ReactElement} from 'react'
import {scopedClassMaker} from "../helpers/classes";
import './layout.scss'
import Aside from "./aside";

const sc = scopedClassMaker('gu-layout')

//继承了HTMLAttributes这个对象，后面用Layout组件的时候就可以接受classname和style了
interface Props extends React.HTMLAttributes<HTMLElement> {
    children: ReactElement | Array<ReactElement>
}

const Layout: React.FunctionComponent<Props> = (props) => {
    const {className, ...rest} = props;


    const childrenasArray = props.children as Array<ReactElement>;
    const hasAside ='length' in childrenasArray&&
        childrenasArray.reduce((result, node) =>
                (result || node.type == Aside)
            , false)
    //reduce(1,2):1为回调，2为初始值
    return (
        <div className={sc({'':true,hasAside:hasAside}, {extra: className})} {...rest}>
            {props.children}
        </div>
    );
};


export default Layout;