const Promise_ = require('./MyPromise.js')

const finallyP2 = new Promise(() => {})

const op = new Promise((resolve, reject) => {
    // setTimeout(() => {
    resolve('1000ms resolve')
    // }, 1000)
})

op.finally(() => {
    return finallyP2 // 'resolve -> a'
}).then(
    value => {
        console.log('origin -> value: ', value)
    },
    reason => {
        console.log('reason: ', reason)
    }
)
