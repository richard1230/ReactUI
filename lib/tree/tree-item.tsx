import React, {ChangeEventHandler, useState} from "react";
import {scopedClassMaker} from "../helpers/classes";
import {SourceDataItem, TreeProps} from "./SourceDataItem";

// type Props = TreeProps & {
//     item: SourceDataItem;
//     level:number
// }

interface Props {
    item: SourceDataItem;
    level: number
    treeProps: TreeProps
}

const scopedClass = scopedClassMaker('fui-tree');
const sc = scopedClass;

const TreeItem: React.FC<Props> = (props) => {
    const {item, level, treeProps} = props;
    const classes = {
        ['level-' + level]: true,
        'Item': true
    };
    const checked = treeProps.multiple ?
        treeProps.selected.indexOf(item.value) >= 0 :
        treeProps.selected === item.value

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const bool = e.target.checked
        if (treeProps.multiple) {
            if (bool) {
                treeProps.onChange([...treeProps.selected, item.value])
            } else {
                //保留没有被选中的，即:将选中的删掉
                treeProps.onChange(treeProps.selected.filter(value => value !== item.value))
            }
        } else {
            if (e.target.checked){
                treeProps.onChange(item.value)
            }else {
                //如果取消，则为空
                treeProps.onChange('')
            }
        }
    }

    const [expanded, setExpanded] = useState(true)

    const expand = () => {
        setExpanded(true)
    }

    const collapse = () => {
        setExpanded(false)
    }
    return (
        <div key={item.value}
             className={sc(classes)}>
            <div className={sc('text')}>
                <input type="checkbox" onChange={onChange} checked={checked}/>
                {item.text}
                {item.children &&
                <span>
                        {expanded ?
                            <span onClick={collapse}>-</span> :
                            <span onClick={expand}>+</span>
                        }
                    </span>
                }
            </div>
            <div className={sc({children: true, collapsed: !expanded})}>
                {item.children?.map(sub =>
                    <TreeItem key={sub.value} item={sub} level={level + 1} treeProps={treeProps}/>
                )}
            </div>
        </div>
    )
};

export default TreeItem