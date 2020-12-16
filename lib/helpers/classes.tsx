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
    return function (name: string | ClassToggles, options?: Options) {

        const namesObject = name instanceof Object ? name:{[name]:name};

         return  Object.
                entries(namesObject).
                filter(k => k[1]!==false).
                 map(kv => kv[0]).
                 map(name => [prefix, name].
                 filter(Boolean).join('-'))
                 .concat(options && options.extra || [])
                 .join(' ')

    };
}


export  {scopedClassMaker}