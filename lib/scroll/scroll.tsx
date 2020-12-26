import * as React from "react";
import {HTMLAttributes, UIEventHandler, useEffect, useRef, useState} from "react";
import './scroll.scss'
// import scrollbarWidth from "./scrollbar-width";

interface Props  extends HTMLAttributes<HTMLDivElement>{

}

const Scroll:React.FunctionComponent<Props> = (props)=>{
    const {children,...rest} = props;
    const [barHeight ,setBarHeight] = useState(0)

    const onScroll: UIEventHandler =(e)=> {
        // console.log("e.currentTarget.scrollTop：");
    }

    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        //这里价格！其实就是告诉ts这里不用管containerRef.current可能为null了，
        // 其实此时他不可能为空，只不过ts不知道
        const scrollHeight = containerRef.current!.scrollHeight;
        console.log("scrollHeight:  "+scrollHeight);
        // console.log("e.currentTarget.getBoundingClientRect().height: ");
        const viewHeight = containerRef.current!.getBoundingClientRect().height
        console.log("viewHeight: "+viewHeight);
        // const barHeight = e.currentTarget.getBoundingClientRect().height
        setBarHeight( viewHeight * viewHeight / scrollHeight)
    },[])

    return(
        <div className="fui-scroll" {...rest}>
            <div className="fui-scroll-inner"
                 onScroll={onScroll}
                 ref = {containerRef}>
                {children}
            </div>
            <div className="fui-scroll-track">
                <div className="fui-scroll-bar" style={{height:barHeight}}>

                </div>

            </div>
        </div>
    )
}

export default Scroll