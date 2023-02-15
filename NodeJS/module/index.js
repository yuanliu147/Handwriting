// console.log(module)
//
//
// console.log(require)


/*
* 模块分为两类：内置模块 和 文件模块
*
* 内置模块：node源码编译时就写入到二进制文件中。 （块）
* 文件模块：代码运行时，动态加载。  （慢）
*
*
* 加载流程： 三个步骤
*
*
*
* */


/*
console.log(Object.getPrototypeOf(module))

console.log('NODE_ENV：', process.env.NODE_ENV)

const x = 1
const y = 2
const z = 3
console.count(
    'x 的值为 ' + x + ' 且已经检查了几次？'
)
console.count(
    'x 的值为 ' + x + ' 且已经检查了几次？'
)
console.count(
    'y 的值为 ' + y + ' 且已经检查了几次？'
)*/

// const function2 = () => console.trace()
// const function1 = () => function2()
// function1()

console.log('\x2b[33m%s\x2b[0m', '你好')
