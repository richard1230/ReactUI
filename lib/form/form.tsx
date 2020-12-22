import * as React from "react";
import {ReactFragment} from "react";
import Input from "../input/input";
import classes from "../helpers/classes";
import './form.scss'

export interface FormValue {
    [K: string]: any
}

interface Props {
    value: FormValue;
    fields: Array<{ name: string, label: string, input: { type: string } }>;
    buttons: ReactFragment;
    onSubmit: React.FormEventHandler;
    onChange: (value: FormValue) => void;
    errors: { [K: string]: string[] };
    errorsDisplayMode?:'first' | 'all';

}

const Form: React.FunctionComponent<Props> = (props) => {
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        props.onSubmit(e);
    }
    const onInputChange = (name: string, value: string) => {
        const newFormValue = {...formData, [name]: value}
        props.onChange(newFormValue)
    }
    const formData = props.value
    return (
        <form onSubmit={onSubmit}>
            <table className="fui-form-table">
                <tbody>

                {props.fields.map(f =>
                    <tr className={classes('fui-form-tr')} key={f.name}>
                        <td className="fui-form-td">
                          <span className="fui-form-label">
                         {f.label}
                          </span>
                        </td>
                        <td className="fui-form-td">
                            <Input className="fui-form-input"
                                   typeof={f.input.type}
                                   value={formData[f.name]}
                                   onChange={(e) => onInputChange(f.name, e.target.value)}
                            />
                            {/*{JSON.stringify(props.errors)}*/}
                            <div className="fui-form-error">
                                {
                                    props.errors[f.name] ?
                                        (props.errorsDisplayMode ==='first' ?
                                            props.errors[f.name][0]:props.errors[f.name].join('-')):
                                        <span>&nbsp;</span>
                                }
                            </div>
                        </td>
                    </tr>
                )}
                {/*//这个地方的tr,td保证了button与上面的两个input对齐*/}
                <tr className="fui-form-tr">
                    <td className="fui-form-td"/>
                    <td className="fui-form-td">
                        {props.buttons}
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}
Form.defaultProps={
    errorsDisplayMode:'first'
}
export default Form;