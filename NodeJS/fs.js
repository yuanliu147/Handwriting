import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import path from 'node:path'
import { Buffer } from 'node:buffer'

/**
 * 所有文件系统操作都具有同步、回调和基于 promise 的形式
 *
 * 基于回调、基于promise的方式，都 不是线程安全的。 对同一文件执行多个并发修改时必须小心，否则可能会损坏数据。
 * */

const buf = Buffer.alloc(100)

const BUFFER_SIZE = buf.length // 每次操作的缓冲区长度
let offset = 0 // 每次操作的文件偏移量

const originFilePath = path.resolve('test1.png')

const originFileObj = path.parse(originFilePath)

const targetFileObj = Object.assign({}, originFileObj, { base: `${originFileObj.name}_copy_${Date.now()}${originFileObj.ext}` })




const targetFilePath = path.format(targetFileObj)


/*
    基于promise的大文件拷贝
fsPromises.open(originFilePath, fs.constants.O_RDONLY).then(originHandle => {
    fsPromises.open(targetFilePath, 'a+').then(targetHandle => {
        // 原文件 和 目标文件都打开了
        function next() {
            originHandle.read(buf, 0, BUFFER_SIZE, offset).then(result => {
                const bytesRead = result.bytesRead // 读取的字节数
                if(!bytesRead) {
                    console.log('拷贝完成~')
                    return
                } // 没有读取到字节数
                targetHandle.write(buf, 0, bytesRead, offset).then(wRes => {
                    offset += bytesRead
                    console.log('已经拷贝的字节数：', offset)
                    next()
                })
            })
        }
        next()
    })
})
*/


// 目录创建
function myMkdir(p) {
    const absPath = path.resolve(p)

    if (path.dirname(absPath) !== path.resolve()) myMkdir(path.dirname(absPath))
    try {
        fs.accessSync(absPath)
    } catch (e) {
        fs.mkdirSync(absPath)
    }
}

myMkdir('./a/b/v/d/a.txt')

