import * as React from "react";
import Form, {FormValue} from "./form";
import {useState,Fragment} from "react";
import Validator, {noError} from "./validator";
import Button from "../button/button";

const FormExample:React.FunctionComponent=()=>{
    const [formData,setFormData] = useState<FormValue>({
        username:"richard",
        password:""
    })

    const [fields] = useState([
        {name:"username",label:"你的用户名",input:{type:'text'}},
        {name: "password",label: '密码',input: {type: 'password'}},
    ])

    const [errors,setErrors] = useState({});



    const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        // axios.post('/signIn',formData).then(success,fail)
        // console.log(formData);
        const rules = [
            {key:'username',required:true},
            {key:'username',minLength:8,maxLength:16},
            {key:'username',pattern:/^[A-Za-z0-9]+$/},
            {key:'password',required:true},

        ];
        const errors = Validator(formData,rules);
        setErrors(errors)
        if (noError(errors)){
            //没错
        }
        console.log(errors);
    }
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
                  onChange={(NewValue)=>setFormData(NewValue)}
                  onSubmit={onSubmit}
            />
        </div>



    )
}

export default FormExample;