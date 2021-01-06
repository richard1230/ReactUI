import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import pinyin from 'tiny-pinyin';


interface Props {
    dataSource:string[]
}

const CitySelect:React.FC<Props>=(props)=>{
    const [dialogVisible,setDialogVisible] = useState(false);

    const map1:{[key:string]:string[]}={}
    props.dataSource.map((city)=>{
        const  py = pinyin.convertToPinyin(city)
        const index = py[0]
        //如果是空的就将其初始化为数组
        map1[index]= map1[index] || [];
        map1[index].push(city)
    })
    console.log(map1);
    console.log(Object.keys(map1));
    const onClick = ()=>{
        setDialogVisible(true)
        console.log("dialogVisible: "+dialogVisible);
    }
    return(
        <>
        <div onClick={onClick}>{props.children}</div>
            {dialogVisible && <Dialog onClose={()=>setDialogVisible(false)} />}

     </>

    );
}

const Dialog:React.FC<{onClose:()=>void}>=(props)=>{
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
            <div className="cityIndex">ABCDE...</div>
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