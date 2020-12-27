import * as React from "react";
import {HTMLAttributes, MouseEventHandler, UIEventHandler, useEffect, useRef, useState} from "react";
import './scroll.scss'

// import scrollbarWidth from "./scrollbar-width";

interface Props extends HTMLAttributes<HTMLDivElement> {

}

const Scroll: React.FunctionComponent<Props> = (props) => {
    const {children, ...rest} = props;
    const [barHeight, setBarHeight] = useState(0)
    const [barTop, _setBarTop] = useState(0)

    const setBarTop = (number: number) => {
        const {current} = containerRef;
        const scrollHeight = current!.scrollHeight;
        const viewHeight = current!.getBoundingClientRect().height;
        const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight
        if (number < 0) return;
        if (number > maxBarTop) {
            number = maxBarTop
        }
        _setBarTop(number)

    }

    const onScroll: UIEventHandler = (e) => {
        const {current} = containerRef;
        const scrollHeight = current!.scrollHeight;
        const viewHeight = current!.getBoundingClientRect().height;
        const scrollTop = current!.scrollTop;
        setBarTop(scrollTop * viewHeight / scrollHeight);

    }

    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        //这里价格！其实就是告诉ts这里不用管containerRef.current可能为null了，
        // 其实此时他不可能为空，只不过ts不知道
        const scrollHeight = containerRef.current!.scrollHeight;
        console.log("scrollHeight:  " + scrollHeight);
        // console.log("e.currentTarget.getBoundingClientRect().height: ");
        const viewHeight = containerRef.current!.getBoundingClientRect().height
        console.log("viewHeight: " + viewHeight);
        // const barHeight = e.currentTarget.getBoundingClientRect().height
        setBarHeight(viewHeight * viewHeight / scrollHeight)
    }, [])

    const draggingRef = useRef(false);
    const firstYRef = useRef(0);
    const firstBarTopRef = useRef(0);

    const onMouseDownBar: MouseEventHandler = (e) => {
        draggingRef.current = true;
        // console.log(e.clientY);
        firstYRef.current = e.clientY;
        firstBarTopRef.current = barTop
        console.log('start');
    };
    const onMouseMoveBar = (e: MouseEvent) => {
        if (draggingRef.current) {
            const delta = e.clientY - firstYRef.current
            const newBarTop = firstBarTopRef.current + delta
            // console.log('试图移动bar');
            setBarTop(newBarTop)
            const scrollHeight = containerRef.current!.scrollHeight;
            const viewHeight = containerRef.current!.getBoundingClientRect().height
            containerRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight
        }
    };
    const onMouseUpBar = () => {
        draggingRef.current = false;
        console.log("end");
    };

    const onSelect = (e:Event)=>{
          if (draggingRef.current = true){
              e.preventDefault()
          }
    }
    useEffect(() => {
        document.addEventListener('mouseup', onMouseUpBar);
        document.addEventListener('mousemove', onMouseMoveBar);
        document.addEventListener('selectstart', onSelect);

        return () => {
            document.removeEventListener('mouseup', onMouseUpBar)
            document.removeEventListener('mousemove', onMouseMoveBar)
            document.removeEventListener('selectstart', onSelect);

        }
    }, [])

    return (
        <div className="fui-scroll" {...rest}>
            {/*// onMouseDown={onMouseDownBar}*/}
            {/*// onMouseMove={onMouseMoveBar}*/}

            <div className="fui-scroll-inner"
                 onScroll={onScroll}
                 ref={containerRef}>
                {children}
            </div>
            <div className="fui-scroll-track">
                <div className="fui-scroll-bar" style={{height: barHeight, transform: `translateY(${barTop}px)`}}
                     onMouseDown={onMouseDownBar}
                >

                </div>

            </div>
        </div>
    )
}

export default Scroll