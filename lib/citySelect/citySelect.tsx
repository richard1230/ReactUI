import React, {useContext, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import pinyin from 'tiny-pinyin';


interface Props {
    dataSource:string[]
}

interface Context {
   map: {[key:string]:string[]}
}

const CitySelectContext = React.createContext<Context >({map:{}})

const CitySelect:React.FC<Props>=(props)=>{
    const [dialogVisible,setDialogVisible] = useState(false);

    // const map1:{[key:string]:string[]}={}
    //左边的map类型与当前Context的map类型是一样的
    const map:Context['map']={}

    props.dataSource.map((city)=>{
        const  py = pinyin.convertToPinyin(city)
        const index = py[0]
        //如果是空的就将其初始化为数组
        map[index]= map[index] || [];
        map[index].push(city)
    })
    // console.log(map);
    // console.log(Object.keys(map));
    const onClick = ()=>{
        setDialogVisible(true)
        console.log("dialogVisible: "+dialogVisible);
    }
    return(
        <CitySelectContext.Provider value={{map}}>
        <div onClick={onClick}>{props.children}</div>
            {dialogVisible && <Dialog onClose={()=>setDialogVisible(false)} />}

     </CitySelectContext.Provider>

    );
}

const Dialog:React.FC<{onClose:()=>void}>=(props)=>{
    const {map} = useContext(CitySelectContext)
    console.log(map);
    const indxList = Object.keys(map).sort();
    return ReactDOM.createPortal(
        (<div className="fui-citySelect-dialog"
              onClick={props.onClose}
        >
            <header>
                <span className="icon">&lt;</span>
                <span>城市选择</span>
            </header>
            <CurrentLocation/>
            <h2>全部城市</h2>
            <ol className="fui-citySelect-index">
                {indxList.map(a=><li key={a}>{a}</li>)}
            </ol>
            <div className="cityList">所有城市</div>
        </div>),document.body)

}


const CurrentLocation:React.FC = ()=>{
  const [city,setCity]=useState<string>('加载中...')
    useEffect(()=>{
        const xhr = new XMLHttpRequest();
        xhr.open('get','http://ip-api.com/json/?lang=zh-CN')
        xhr.onload=()=>{
            const string = xhr.responseText;
            const obj = JSON.parse(string);
            const newcity = obj.city;
            console.log(newcity);
            setCity(newcity)
        }
        xhr.onerror = () => {
            setCity('未知');
        };
        xhr.send()
    },[]);
    return (
        <div className="currentCity">
            当前城市：{city}
        </div>
    );
}

export default CitySelect