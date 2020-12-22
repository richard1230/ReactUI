import {FormValue} from "./form";

interface FormRule {
    key: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validator?: {
        name: string,
        validate: (value: string) => Promise<void>
    }
}

type FormRules = Array<FormRule>

// interface FormErrors {
//     [K:string]:string[]
// }

function isEmpty(value: any) {
    return value === undefined || value === null || value === '';
}


//没有key就说明没有错误
export function noError(errors: any) {
    return Object.keys(errors).length === 0;
}

interface OneError {
    message: string;
    promise?: Promise<any>;
}

const Validator = (formValue: FormValue, rules: FormRules, callback: (errors: any) => void): void => {
    let errors: any = {};
    const addError = (key: string, error: OneError) => {
        if (errors[key] === undefined) {
            errors[key] = [];
        }
        errors[key].push(error)
    }
    rules.map(rule => {
        const value = formValue[rule.key];

        if (rule.validator) {
            const promise = rule.validator.validate(value)
            addError(rule.key, {message: '用户名已经存在', promise});
        }
        if (rule.required && isEmpty(value)) {
            addError(rule.key, {message: '必填'})
        }

        if (rule.minLength && !isEmpty(value) && value!.length < rule.minLength) {
            addError(rule.key, {message: '太短'})
        }

        if (rule.maxLength && !isEmpty(value) && value!.length > rule.maxLength) {
            addError(rule.key, {message: '太长'})
        }

        if (rule.pattern) {
            if (!(rule.pattern.test(value))) {
                addError(rule.key, {message: '格式不正确'})
            }
        }

    });

    console.log(flat(Object.values(errors)));
    console.log('我的上面是：flat(Object.values(errors))');
    console.log(flat(Object.values(errors)).filter(item => item.promise));
    console.log('我的上面是：flat(Object.values(errors)).filter(item=>item.promise)');
    console.log(flat(Object.values(errors)).filter(item => item.promise).map(item => item.promise));
    console.log('我的上面是：flat(Object.values(errors)).filter(item=>item.promise).map(item=>item.promise)');

    const promiseList = flat(Object.values(errors))
        .filter(item => item.promise)
        .map(item => item.promise)
    Promise.all(promiseList)
        .then(() => {
            console.log(Object.keys(errors));
            console.log("上面是：Object.keys(errors)");

            console.log(Object.keys(errors)
                .map<[string, string[]]>(key =>
                    [key, errors[key].map((item: OneError) => item.message)]
                ));
            console.log("Object.keys(errors)\n" +
                "                    .map<[string, string[]]>(key =>\n" +
                "                        [key, errors[key].map((item: OneError) => item.message)]\n" +
                "                    ));");


            const newErrors = fromEntries(
                Object.keys(errors)
                    .map<[string, string[]]>(key =>
                        [key, errors[key].map((item: OneError) => item.message)]
                    ));
            console.log(newErrors);
            console.log("上面是: newErrors");

            callback(newErrors);
        }, () => {
            const newErrors = fromEntries(
                Object.keys(errors)
                    .map<[string, string[]]>(
                        //注意:这里的返回值是个数组
                        key =>
                        //key = username
                        //errors['username'] == [{message:'名字不够长', promise:"..."}]
                        //map(a=>b) ===> 这个式子返回的是b; map(item=>item.message)==>这里返回的是：名字不够长
                        //[username,errors[..]...]中的errors['username']就是[{message:'名字不够长', promise:"..."}]
                        [key, errors[key].map((item: OneError) => item.message)]
                    ));
            callback(newErrors);
        })

}

export default Validator;

function flat(array: Array<any>) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof Array) {
            result.push(...array[i]);
        } else {
            result.push(array[i])
        }
    }
    return result;
}

//这个函数的功能:将数组变为对象
function fromEntries(array: Array<[string, string[]]>) {
    const result: { [key: string]: string[] } = {};
    for (let i = 0; i < array.length; i++) {
        result[array[i][0]] = array[i][1];
    }
    return result;
}


