import React, {ChangeEventHandler, useRef, useState} from "react";
import {scopedClassMaker} from "../helpers/classes";
import {SourceDataItem, TreeProps} from "./SourceDataItem";
import useUpdate from "../hooks/useUpdate";

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

    function collectChildrenValues (item:SourceDataItem):string[]{
        return flatten(item.children?.map(i=>[i.value,collectChildrenValues(i)]))
    }
    interface RecursiveArray<T> extends Array<T | RecursiveArray<T>>{}

    function flatten(array?:RecursiveArray<string>) :string[] {
        if (!array){return [];}
       return  array.reduce<string[]>((result,current)=>{
            if (typeof  current==='string'){
                return result.concat(current);
            }else {//此时为string[]类型
                return result.concat(flatten(current))
            }},[]);
        // const result = [];
        // for (let i = 0; i<array.length;i++){
        //     if (array[i] instanceof  Array){
        //         result.push(...flatten(array[i] as RecursiveArray<string>))
        //     }else {
        //         result.push(array[i])
        //     }
        // }
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const childrenValues = collectChildrenValues(item);
        console.log(childrenValues);

        const bool = e.target.checked
        if (treeProps.multiple) {
            if (bool) {
                treeProps.onChange([...treeProps.selected, item.value,...childrenValues])
            } else {
                //保留没有被选中的，即:将选中的删掉;
                // ===>value不在item同时也不在childrenValues里面
                treeProps.onChange(treeProps.selected.filter(value => (value !== item.value&& childrenValues.indexOf(value)===-1)))
            }
        } else {
            if (e.target.checked) {
                treeProps.onChange(item.value)
            } else {
                //如果取消，则为空
                treeProps.onChange('')
            }
        }
    }

    const [expanded, setExpanded] = useState(true)
    const divRef = useRef<HTMLDivElement>(null)
    const expand = () => {
        setExpanded(true)
    }

    const collapse = () => {
        setExpanded(false)
    }

    useUpdate(expanded, () => {
        if (!divRef.current) {
            return
        }
        if (expanded) {
            divRef.current.style.position = 'absolute';
            divRef.current.style.opacity = '0'
            divRef.current.style.height = 'auto'
            const {height} = divRef.current.getBoundingClientRect();
            divRef.current.style.position = ''
            divRef.current.style.opacity = ''
            divRef.current.style.height = '0px';
            divRef.current.getBoundingClientRect();
            divRef.current.style.height = height + 'px'
            const AfterExpand = () => {
                if (!divRef.current) {
                    return
                }
                divRef.current.style.height = 'auto';
                divRef.current.classList.add('fui-tree-children-present')
                divRef.current.removeEventListener('transitionend', AfterExpand)
            }
            divRef.current.addEventListener('transitionend', AfterExpand)
        } else {
            const {height} = divRef.current.getBoundingClientRect();
            divRef.current.style.height = height + 'px';
            divRef.current.getBoundingClientRect();
            divRef.current.style.height = '0px';
            const AfterCollapse = () => {
                if (!divRef.current) {
                    return
                }
                divRef.current.style.height = '';
                divRef.current.classList.add('fui-tree-children-gone')
                divRef.current.removeEventListener('transitionend', AfterCollapse)
            }
            divRef.current.addEventListener('transitionend', AfterCollapse)
        }
    })
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
            <div ref={divRef} className={sc({children: true, collapsed: !expanded})}>
                {item.children?.map(sub =>
                    <TreeItem key={sub.value} item={sub} level={level + 1} treeProps={treeProps}/>
                )}
            </div>
        </div>
    )
};

export default TreeItem