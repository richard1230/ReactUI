import React from "react";
import "./importIcons"
import './icon.scss';
import classes from './helpers/classes';



interface IconProps extends React.SVGAttributes<SVGElement> {
    name: string;
}

//如何申明一个函数组件接受的props类型
//<>：表示FunctionComponent接受一个参数,其源代码里面指明了此参数为p(这里为name),不传的话即为空对象
// interface FunctionComponent<P = {}>
const Icon: React.FunctionComponent<IconProps> = (props) => {
    const {className, ...restProps} = props;
    return (
        <svg className={classes('fui-icon', className)}
             {...restProps}
        >
            <use xlinkHref={`#${props.name}`}/>
        </svg>

    )
}

export default Icon