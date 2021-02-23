const asyncArrayFindIndex = require('./index')


function createArray(N) {
    // [0, 1, 2, ... , N]
    return Array.from(Array(N).keys())
}


function timerun() {
    const run = Date.now()

    return {
        stop: function () {
            const stop = Date.now()

            return stop - run
        }
    }
}

async function arrayFindIndex() {
    let findIndex

    const timerunCreateArray = timerun()
    const arr = createArray(100000000)
    console.log('time createArray ' + timerunCreateArray.stop())


    function callback(item) {
        return item === 99999999
    }

    const timerunArrayFindIndex = timerun()
    findIndex = arr.findIndex(callback)
    console.log('time arr.findIndex ' + timerunArrayFindIndex.stop())
    console.log('index = ' + findIndex)

    const timerunAsyncArrayFindIndex = timerun()
    findIndex = await asyncArrayFindIndex(arr, callback, 10000)
    console.log('time asyncArrayFindIndex ' + timerunAsyncArrayFindIndex.stop())
    console.log('index = ' + findIndex)
}

arrayFindIndex()