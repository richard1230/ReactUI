module.exports = {
    verbose: true,
    clearMocks: false,
    // 最重要的就是下面这5行
    reporters: ["default"],
    collectCoverage: true,
    //测试那个目录下面的代码，以及那些是不测的(就是！后面的)
    collectCoverageFrom: ["lib/**/*.{ts,tsx}", "!**/node_modules/**"],
    //生成的相关文档放在coverage目录下面
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleDirectories: ['node_modules'],
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.test.json',
        },
    },
    moduleNameMapper: {
        //随便导出一个文件
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/test/__mocks__/file-mock.js",
       //随便导出一个对象
        "\\.(css|less|sass|scss)$": "<rootDir>/test/__mocks__/object-mock.js",
    },
    testMatch: ['<rootDir>/**/__tests__/**/*.unit.(js|jsx|ts|tsx)'],
    transform: {
        "^.+unit\\.(js|jsx)$": "babel-jest",
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: ["<rootDir>test/setupTests.js"]
}
