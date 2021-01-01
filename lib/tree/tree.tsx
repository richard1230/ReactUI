import React, {ChangeEventHandler} from "react";
import {scopedClassMaker} from "../helpers/classes";
import './tree.scss'

export interface SourceDataItem {
    text: string;
    value: string;
    children?: SourceDataItem[];
}

type A = {
    selected: string[],
    multiple: true,
    onChange: (NewSelected: string []) => void

}
type B = {
    selected: string,
    multiple?: false,
    onChange: (NewSelected: string) => void
}

type Props = {
    sourceData: SourceDataItem[];
} & (A | B)

const scopedClass = scopedClassMaker('fui-tree');
const sc = scopedClass;


const Tree: React.FC<Props> = (props) => {
    const renderItem = (item: SourceDataItem,
                        // selected: string[],
                        // onChange: (item: SourceDataItem, bool: boolean) => void,
                        level = 1) => {

        const classes = {
            ['level-' + level]: true,
            'Item': true
        };

        const checked = props.multiple ?
            props.selected.indexOf(item.value) >= 0 :
            props.selected === item.value

        const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
            const bool = e.target.checked
            if (props.multiple) {
                if (bool) {
                    props.onChange([...props.selected, item.value])
                } else {
                    //保留没有被选中的，即:将选中的删掉
                    props.onChange(props.selected.filter(value => value !== item.value))
                }
            }else {
                props.onChange(item.value)
            }
        }
        return (
            <div key={item.value}
                 className={sc(classes)}>
                <label className={sc('text')}>
                    <input type="checkbox"
                           onChange={onChange}
                           checked={checked}
                    />
                    {item.text}
                </label>
                <div className={sc('children')}>
                    {item.children?.map(sub => {
                        return renderItem(sub, level + 1)
                    })}
                </div>
            </div>
        )
    };

    return (
        <div>
            {
                props.sourceData?.map(item => {
                    return renderItem(item)
                })
            }
        </div>
    )


}

export default Tree