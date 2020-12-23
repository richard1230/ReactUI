import * as React from "react";
import Form, {FormValue} from "./form";
import {useState,Fragment} from "react";
import Validator, {noError} from "./validator";
import Button from "../button/button";

const usernames = ['richard', 'jack', 'alice', 'bob'];
const checkUserName = (username: string, succeed: () => void, fail: () => void) => {
    setTimeout(() => {
        console.log('我现在才知道用户名是否存在，这是Ns种之后的事情了');
        if (usernames.indexOf(username) >= 0) {
            // fail();
            succeed();
            console.log('我在succed的后面,successed执行了');
        } else {
            // succeed();
            fail();

        }
    }, 6000);
};



const FormExample:React.FunctionComponent=()=>{
    const [formData,setFormData] = useState<FormValue>({
        username:"richard",
        password:""
    })

    const [fields] = useState([
        {name:"username",label:"你的用户名",input:{type:'text'}},
        // {name: 'image', label: '头像', input: {type: 'text'}},
        {name: "password",label: '密码',input: {type: 'password'}},
    ])

    const [errors,setErrors] = useState({});



    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        // axios.post('/signIn',formData).then(success,fail)
        // console.log(formData);
        const rules = [
            {key:'username',required:true},
            {key:'username',minLength:8,maxLength:16},
            {key:'username',validator:{
                    name:'unique',
                    validate(username:string){
                        console.log('有人调用了： validate(username:string) ，我的返回值是 Promise ' +
                            '这里是验证username是否有错误的');
                        return  new Promise<void>(
                        (resolve,reject)=>{
                            checkUserName(username,resolve,reject);
                        });
                    }
                  }
                },
            {key:'username',pattern:/^[A-Za-z0-9]+$/},
            {key:'password',required:true},

        ];
        Validator(formData,rules,(errors)=>{
            console.log(errors);
            console.log('我这里的1是最后调用的，我是callback里面的数据,上面打印的是errors');

            setErrors(errors)
            console.log("确定调用setErrors");
            if (noError(errors)){
            }
        });
    }
    const transformError = (message: string) => {
        const map: any = {
            unique: 'username is taken',
            required: 'required',
            minLength: 'too short',
            maxLength: 'too long',
        };
        return map[message];
    };
    return(
        <div>
            <Form value={formData} fields={fields}
                  buttons={
                      <Fragment>
                          <Button type="submit" level='important'>提交</Button>
                          <Button>返回</Button>
                      </Fragment>
                  }
                  errors={errors}
                  transformError={transformError}
                  onChange={(NewValue)=>setFormData(NewValue)}
                  onSubmit={onSubmit}
            />
        </div>



    )
}

export default FormExample;