import path from 'node:path'

/**
 * path.basename(path[, suffix]) => 获取路径的最后一部分，如果路径最后以"路径分割符"结尾的话，该分割符会被忽略
 *
 * @param path 必选
 * @param suffix 可选，要删除的可选后缀。如果返回的最后一部分以此 suffix 结尾，则去除后再返回；
 *                    如果没有匹配则什么都不做
 *
 * PS：basename 将扩展名视为大小写区分的字符串
 * */
!(function testBasename() {
    const b1 = '/usr/test/index.html'
    const b2 = '/usr/test/a/'


    console.log(path.basename(b1))
    console.log(path.basename(b1, 'html'))
    console.log(path.basename(b1, 'x.html'))
    console.log(path.basename(b1, 'index'))

    console.log(path.basename(b2))
    console.log(path.basename(b2, 'html'))
    console.log(path.basename(b2, 'a.html'))
})()

console.log('-------------------------------------分割线-------------------------------------------')
/**
 * path.delimiter 提供特定于平台的路径定界符：
 *      ";" 用于Windows
 *      ":" 用于POSIX （可移植操作系统接口，unix 和 linux 貌似都遵循POSIX）
 * */

!function(){
    console.log('delimiter：', path.delimiter)

    console.log(process.env.PATH)

    console.log(process.env.PATH.split(path.delimiter))
}()

console.log('-------------------------------------分割线-------------------------------------------')
/**
 * path.resolve([...paths])
 * path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
 * 给定的路径序列【从右到左】处理，每个后续的 path 会被追加到前面，直到构建绝对路径。
 *
 * 如果在处理完所有给定的 path 片段之后，还没有生成绝对路径，则使用当前工作目录。
 *
 * 生成的路径被规范化，并【删除尾部斜杠】（除非路径解析为根目录）。
 *
 * 零长度的 path 片段被忽略。
 *
 * 如果没有传入 path 片段，则 path.resolve() 将返回当前工作目录的绝对路径。
 *
 * */

console.log('-------------------------------------分割线-------------------------------------------')
console.log(path.dirname('/a'))
console.log(path.dirname('/')) // 已经是根目录的话，其 dirname 与其自身相等


