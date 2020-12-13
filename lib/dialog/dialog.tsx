import React, {Fragment} from "react";
import './dialog.scss'
import {Icon} from "../index";

interface Props {
    visible: boolean
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
                    <button>ok</button>
                    <button>cancel</button>
                </footer>
            </div>

        </Fragment>


    )
}


export default Dialog;