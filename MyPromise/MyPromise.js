const PENDING = '[[pending]]'
const FULFILLED = '[[fulfilled]]'
const REJECTED = '[[rejected]]'

class MyPromise {
    _status = PENDING // 状态

    _result = '' // 解决的值，拒绝的原因

    _resolveCallback = []
    _rejectCallback = []

    _resolve = (value) => {
        if (this._status !== PENDING) return // 状态一旦发生变化则不可逆

        this._result = value // 设置resolve的值
        this._status = FULFILLED // 修改状态

        while (this._resolveCallback.length) this._resolveCallback.shift()()
    }
    _reject = (reason) => {
        if (this._status !== PENDING) return // 状态一旦发生变化则不可逆

        this._result = reason // 设置reject的原因
        this._status = REJECTED // 修改状态

        while (this._rejectCallback.length) this._rejectCallback.shift()()
    }
    constructor(executor) {
        try {
            executor(this._resolve, this._reject)
        } catch (e) {
            this._reject(e)
        }
    }

    then(resolveCallback, rejectCallback) { // then始终返回一个新的Promise
        resolveCallback = typeof resolveCallback === 'function' ? resolveCallback : (value) => value

        rejectCallback = typeof rejectCallback === 'function' ? rejectCallback : (reason) => { throw reason } // 拒绝的原因应该抛出

        const p = new MyPromise((resolve, reject) => {
            if (this._status === FULFILLED) {
                setTimeout(() => {
                    try {
                        const res = resolveCallback(this._result)

                        this._handleResolvePromise(p, res, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else if (this._status === REJECTED) {
                setTimeout(() => {
                    try {
                        const res = rejectCallback(this._result)

                        this._handleResolvePromise(p, res, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else { // 处理executor中异步resolve/reject，此时_status为PENDING
                this._resolveCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const res = resolveCallback(this._result)
                            this._handleResolvePromise(p, res, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)

                })
                this._rejectCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const res = rejectCallback(this._result)

                            this._handleResolvePromise(p, res, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return p
    }

    catch(callback) {
        return this.then(undefined, callback)
    }

    finally(callback) {
        return this.then(
            value => {
                const result = callback()
                if (result instanceof MyPromise) {
                    return result.then(() => value)
                } else return value
            },
            reason => {
                const result = callback()
                if (result instanceof MyPromise) {
                    return result.then(() => { throw reason })
                } else throw reason
            }
        )
    }

    static resolve(object) {
        if (object instanceof MyPromise) return object
        return new MyPromise((resolve) => resolve(object))
    }

    static all(iterable) {
        return new MyPromise((resolve, reject) => {
            if (typeof iterable !== 'object' || iterable === null) {
                iterable = Array(iterable)
            } else if (typeof iterable[Symbol.iterator] !== 'function') {
                return reject(new TypeError('object is not iterable'))
            }
            let addedNum = 0 // 记录有多少个执行完的值，因为设置异步，就不能直接在for循环后面resolve，此时resolve的话异步还没有执行完
            const result = []
            const addItem = (index, value) => {
                result[index] = value
                addedNum++

                if (addedNum === iterable.length) { // 此时表示所有的异步已经执行完了
                    resolve(result)
                }
            }
            for (let i = 0; i < iterable.length; i++) {
                const item = iterable[i]

                if (item instanceof MyPromise) { // promise对象
                    item.then(res => addItem(i, res), reject)
                } else { // 普通值
                    addItem(i, item)
                }
            }
        })
    }

    static race(iterable) {
        return new MyPromise((resolve, reject) => {
            if (typeof iterable !== 'object' || iterable === null) {
                iterable = Array(iterable)
            } else if (typeof iterable[Symbol.iterator] !== 'function') {
                return reject(new TypeError('object is not iterable'))
            }
            let hasFinish = false
            for(let i = 0; i < iterable.length; i++) {
                if(hasFinish) return
                const item = iterable[i]
                if(item instanceof MyPromise) {
                    item.then(resolve, reject).finally(() => { hasFinish = true })
                } else {
                    resolve(item)
                    return
                }
            }
        })
    }


    _handleResolvePromise(p, res, resolve, reject) {
        if (p === res) { // 如果then()返回的promise对象，和 resolveCallback/rejectCallback返回的promise对象相等时就会发生错误，
            return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
        }
        if (res instanceof MyPromise) { // 如果 resolveCallback 返回的结果是promise实例，则不改变其状态
            res.then(resolve, reject)
        } else { // 如果 resolveCallback 返回的结果不是promise实例，则直接传递给新Promise的then
            resolve(res)
        }
    }
}

export default MyPromise
