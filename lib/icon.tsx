import React from "react";
import "./importIcons"
import './icon.scss';


interface IconProps {
    name: string
    onClick: React.MouseEventHandler<SVGElement>
}

//如何申明一个函数组件接受的props类型
//<>：表示FunctionComponent接受一个参数,其源代码里面指明了此参数为p(这里为name),不传的话即为空对象
// interface FunctionComponent<P = {}>
const Icon: React.FunctionComponent<IconProps> = (props) => {
    return (
        <svg className="fui-icon" onClick={props.onClick}>
            <use xlinkHref={`#${props.name}`}/>
        </svg>

    )
}

export default Icon