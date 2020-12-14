import React, {Fragment, ReactElement} from "react";
import './dialog.scss'
import {Icon} from "../index";

interface Props {
    visible: boolean,
    buttons: Array<ReactElement>
}


function scopedClassMaker(prefix: string) {
    return function x(name?: string) {
        return [prefix, name].filter(Boolean).join('-');
    };
}

const scopedClass = scopedClassMaker('fui-dialog');
const sc = scopedClass;

const Dialog: React.FunctionComponent<Props> = (props) => {
    return (
        props.visible?
        <Fragment>
            <div className={sc('mask')}>
            </div>

            <div className={sc()}>
                <div className={sc("close")}>
                  <Icon name="close"/>
                </div>
                <header className={sc("header")}>
                   提示
                </header>
                <main className={sc("main")}>
                    {props.children}
                </main>
                <footer className={sc("footer")}>
                    {props.buttons}
                </footer>
            </div>

        </Fragment>
        :null


    )
}


export default Dialog;