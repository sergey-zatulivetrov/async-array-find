# async-array-find

Searching a large array using subarray division and wrapping them in a Promise.

<img src="https://github.com/sergey-zatulivetrov/async-array-find/blob/main/example.png?raw=true" alt="example"/>


##install

```ssh
npm i async-array-find
```

## example

```javascript
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
```