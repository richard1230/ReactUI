import React, {Fragment, ReactElement, ReactNode} from "react";
import './dialog.scss'
import {Icon} from "../index";
import {scopedClassMaker} from "../helpers/classes";
import ReactDOM from "react-dom";

interface Props {
    visible: boolean,
    buttons?: Array<ReactElement>,
    onClose: React.MouseEventHandler,
    closeOnClickMask?: boolean;
}


const scopedClass = scopedClassMaker('fui-dialog');
const sc = scopedClass;

const Dialog: React.FunctionComponent<Props> = (props) => {
    const onClickClose: React.MouseEventHandler = (e) => {
        props.onClose(e);
    }

    const onClickMask: React.MouseEventHandler = (e) => {
        if (props.closeOnClickMask) {
            props.onClose(e);
        }
    }

    const result = props.visible ?
        <Fragment>
            <div className={sc('mask')} onClick={onClickMask}>
            </div>

            <div className={sc('')}>
                <div className={sc("close")} onClick={onClickClose}>
                    <Icon name="close"/>
                </div>
                <header className={sc("header")}>
                    提示
                </header>
                <main className={sc("main")}>
                    {props.children}
                </main>
                {
                    props.buttons && props.buttons.length > 0 &&
                    <footer className={sc("footer")}>
                        {props.buttons && props.buttons.map((button, index) =>
                            React.cloneElement(button, {key: index}))}
                    </footer>
                }
            </div>
        </Fragment>
        : null
    return (
        ReactDOM.createPortal(result, document.body)
    )
}

Dialog.defaultProps = {
    closeOnClickMask: false
}

const modal = (content: ReactNode, buttons?: Array<ReactElement>, afterClose?: () => void) => {
    const close = () => {
        //重新渲染组件，同时改一下visible
        ReactDOM.render(React.cloneElement(component, {visible: false}), div);
        //从div上面卸载掉这个组件
        ReactDOM.unmountComponentAtNode(div)
        //删除div
        div.remove()
    }
    const component = <Dialog
        visible={true}
        buttons={buttons}
        onClose={() => {
            close();
            afterClose && afterClose()
        }}>
        {content}
    </Dialog>
    const div = document.createElement('div')
    document.body.append(div)
    ReactDOM.render(component, div)
    return close;
}

const alert = (content: string) => {
    const button = <button onClick={() => close()}>OK</button>
    //函数返回操作这个函数内部的api
    const close = modal(content, [button])

}

const confirm = (content: string, yes?: () => void, no?: () => void) => {
    const onYes = () => {
        close();
        yes && yes()
    }
    const onNo = () => {
        close();
        no && no()
    }
    const buttons = [
        <button onClick={onYes}>yes</button>,
        <button onClick={onNo}>no</button>
    ]
    //函数返回操作这个函数内部的api
    const close = modal(content, buttons, no)
};

export {alert, confirm, modal}

export default Dialog;