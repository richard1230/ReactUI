import React from "react";
// import {scopedClassMaker} from "../helpers/classes";
import './tree.scss'
import TreeItem from "./tree-item";
import {TreeProps} from "./SourceDataItem";




// const scopedClass = scopedClassMaker('fui-tree');
// const sc = scopedClass;


const Tree: React.FC<TreeProps> = (props) => {



    return (
        <div>
            {
                props.sourceData?.map(item =>
                    <TreeItem key={item.value} treeProps={props} item={item} level={1}/>
                )
            }
        </div>
    )

}

export default Tree