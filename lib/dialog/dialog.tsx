import React, {Fragment, ReactElement} from "react";
import './dialog.scss'
import {Icon} from "../index";

interface Props {
    visible: boolean,
    buttons: Array<ReactElement>,
    onClose:React.MouseEventHandler,
    closeOnClickMask?:boolean;
}


function scopedClassMaker(prefix: string) {
    return function x(name?: string) {
        return [prefix, name].filter(Boolean).join('-');
    };
}

const scopedClass = scopedClassMaker('fui-dialog');
const sc = scopedClass;

const Dialog: React.FunctionComponent<Props> = (props) => {
    const onClickClose :React.MouseEventHandler= (e)=>{
         props.onClose(e);
    }

    const onClickMask: React.MouseEventHandler = (e)=>{
        if(props.closeOnClickMask){
            props.onClose(e);
        }
    }
    return (
        props.visible?
        <Fragment>
            <div className={sc('mask')} onClick={onClickMask}>
            </div>

            <div className={sc()}>
                <div className={sc("close")} onClick={onClickClose}>
                  <Icon name="close"/>
                </div>
                <header className={sc("header")}>
                   提示
                </header>
                <main className={sc("main")}>
                    {props.children}
                </main>
                <footer className={sc("footer")}>
                    {props.buttons.map((button,index)=>
                        React.cloneElement(button,{key:index}))}
                </footer>
            </div>

        </Fragment>
        :null


    )
}

Dialog.defaultProps={
    closeOnClickMask:false
}

export default Dialog;