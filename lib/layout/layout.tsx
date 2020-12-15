import React from 'react'
import scopedClassMaker from "../classes";
import './layout.scss'

const sc = scopedClassMaker('gu-layout')

//继承了HTMLAttributes这个对象，后面用Layout组件的时候就可以接受classname和style了
interface Props extends React.HTMLAttributes<HTMLElement>{

}

const Layout: React.FunctionComponent<Props> = (props) => {
    const {className, ...rest}= props;
    return (
        <div className={[sc(),className].join(' ')} {...rest}>
            {props.children}
        </div>
    )
};


export default Layout;