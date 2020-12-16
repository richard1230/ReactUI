//保证除了webpack能够识别svg以外,ts也要能够识别
declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.png' {
    const content: number;
    export default content
}