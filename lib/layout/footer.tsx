import React from 'react'
import scopedClassMaker from "../classes";


const sc = scopedClassMaker('gu-layout')

//继承了HTMLAttributes这个对象，后面用Layout组件的时候就可以接受classname和style了
interface Props extends React.HTMLAttributes<HTMLElement>{

}

const Footer: React.FunctionComponent<Props> = (props) => {
    const {className, ...rest}= props;
    return (
        <div className={sc('footer',{extra:className})} {...rest}>
            footer
        </div>
    )
};


export default Footer;