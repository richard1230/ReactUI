import {FormValue} from "./form";

interface FormRule {
    key: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    validator?: (value: string) => Promise<string>
}

type FormRules = Array<FormRule>


function isEmpty(value: any) {
    return value === undefined || value === null || value === '';
}


//没有key就说明没有错误
export function noError(errors: any) {
    return Object.keys(errors).length === 0;
}

type OneError = string | Promise<string>;


const Validator = (formValue: FormValue, rules: FormRules, callback: (errors: any) => void): void => {
    //key是引用类型
    let errors: { [key: string]: OneError[] } = {};
    const addError = (key: string, error: OneError) => {
        if (errors[key] === undefined) {
            errors[key] = [];
        }
        errors[key].push(error)
    }
    rules.map(rule => {
        const value = formValue[rule.key];

        if (rule.validator) {
            const promise = rule.validator(value)
            addError(rule.key, promise);
        }
        if (rule.required && isEmpty(value)) {
            addError(rule.key, 'required')
        }

        if (rule.minLength && !isEmpty(value) && value!.length < rule.minLength) {
            addError(rule.key, 'minLength')
        }

        if (rule.maxLength && !isEmpty(value) && value!.length > rule.maxLength) {
            addError(rule.key, 'maxLength')
        }

        if (rule.pattern) {
            if (!(rule.pattern.test(value))) {
                addError(rule.key, 'pattern')
            }
        }
    });


    const flattenErrors = flat<[string, OneError]>(Object.keys(errors).map<[string, OneError][]>(key =>
        errors[key].map<[string, OneError]>(error => [key, error])
    ));
    const newPromises = flattenErrors.map(
        ([key, promiseOrString]) => {
            const promise = promiseOrString instanceof Promise ? promiseOrString : Promise.reject(promiseOrString);
            return promise.then<[string, undefined], [string, string]>(
                () => {
                    return [key, undefined];
                },
                (reason) => {
                    return [key, reason];
                })
        }
    );

    function hasError(item: [string, undefined] | [string, string]): item is [string, string] {
        return typeof item[1] === 'string';
    }

    Promise.all(newPromises).then(results => {
        callback(zip(results.filter<[string, string]>(hasError)))
    })
}

export default Validator;

function flat<T>(array: Array<T | T[]>) {
    const result: T[] = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] instanceof Array) {
            //i要么是T要么是T的数组
            //其实这里是T[],这里其实是ts的坑
            result.push(...array[i] as T[]);
        } else {
            //这里是T
            result.push(array[i] as T)
        }
    }
    return result;
}

function zip(kvList: Array<[string, string]>) {
    //result的类型的根据===>最后的结果为 "user":["必填","太长"]
    const result: { [key: string]: string[] } = {};
    kvList.map(([key, value]) => {
        result[key] = result[key] || [];
        result[key].push(value);
    });
    return result;
}



