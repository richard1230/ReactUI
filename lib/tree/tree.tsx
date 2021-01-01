import React, {ChangeEventHandler, useState} from "react";
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

        const [expanded,setExpanded] = useState(true)

        const expand = ()=>{
          setExpanded(true)
        }

        const collapse = ()=>{
           setExpanded(false)
        }

        return (
            <div key={item.value}
                 className={sc(classes)}>
                <div className={sc('text')}>
                    <input type="checkbox"  onChange={onChange} checked={checked}/>
                    {item.text}
                    {item.children &&
                    <span>
                        {expanded ?
                                <span onClick={collapse}>-</span>:
                                <span onClick={expand}>+</span>
                        }
                    </span>
                    }
                </div>
                <div className={sc({children:true,collapsed: !expanded})}>
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