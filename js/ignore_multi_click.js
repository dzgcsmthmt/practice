function ignoreMultiClick(func, manual = false) {
    let lock = false
    return function (...args) {
        if (lock) return
        lock = true
        let done = () => (lock = false)
        if (manual) return func.call(this, ...args, done)
        let promise = func.call(this, ...args)
        Promise.resolve(promise).finally(done)
        return promise
    }
}