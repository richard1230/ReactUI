function classes(...names: (string | undefined)[]) {
    //Boolean是去除空格的，你给我什么，就返回什么
    return names.filter(Boolean).join(' ');
}

export default classes

interface Options {
    extra: string | undefined
}

interface ClassToggles {
    [K: string]: boolean
}

function scopedClassMaker(prefix: string) {
    return function (name?: string | ClassToggles, options?: Options) {

        let name2;
        let result;
        if (typeof name === 'string' || name === undefined) {
            name2 = {name:name}
        } else {//此时为name为ClassToggles类型
            name2 = name;
        }

        const name3 = Object.entries(name2).filter(k => k[1]).map(kv => kv[0])

        result = name3.map(name =>
            [prefix, name].filter(Boolean).join('-')
        ).join(' ')

        if (options && options.extra) {
            return [result, options && options.extra].filter(Boolean).join(' ');
        } else {
            return result;
        }
    };
}


export  {scopedClassMaker}