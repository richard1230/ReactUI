import React, {Fragment,  ReactElement} from "react";
import './dialog.scss'
import {Icon} from "../index";
import scopedClassMaker from '../classes'
import ReactDOM from "react-dom";

interface Props {
    visible: boolean,
    buttons?: Array<ReactElement>,
    onClose:React.MouseEventHandler,
    closeOnClickMask?:boolean;
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

    const x =  props.visible?
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
                    {props.buttons && props.buttons.map((button,index)=>
                        React.cloneElement(button,{key:index}))}
                </footer>
            </div>

        </Fragment>
        :null
    return (
      ReactDOM.createPortal(x,document.body)
    )
}

Dialog.defaultProps={
    closeOnClickMask:false
}

const alert =(content:string)=>{
   const component = <Dialog visible={true} onClose={()=>{
       //重新渲染组件，同时改一下visible
       ReactDOM.render(React.cloneElement(component,{visible:false}),div);
       //从div上面卸载掉这个组件
       ReactDOM.unmountComponentAtNode(div)
       //删除div
       div.remove()
   }}>{content}</Dialog>
    //动态地创建一个div,而后div里面塞一个组件
    const div = document.createElement('div')
    document.body.append(div)
    //div里面塞一个组件
    ReactDOM.render(component,div)
}
export {alert}

export default Dialog;