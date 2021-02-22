function consoleLogDateString(text) {
    console.log(text + ' ' + new Date().toLocaleString())
}

function itemGenerate(id) {
    return {
        id: id
    }
}

function arrayGenerate(length, itemGenerate) {
    const arr = []

    consoleLogDateString('Время начала генерации массива')

    for (let id = 0; id < length; id++) {
        arr.push(itemGenerate(id))
    }

    consoleLogDateString('Время конца генерации массива')

    return arr
}

function subarrayFindIndex(arr, start, stop, callback) {
    for (let i = start; i < stop; i++) {
        if (callback(arr[i])) {
            return i
        }
    }
}

function promiseSubarrayFindIndex(arr, start, stop, callback) {
    return new Promise(function (resolve, reject) {
        const findIndex = subarrayFindIndex(arr, start, stop, callback)

        if (findIndex > -1) {
            resolve(findIndex)
        } else {
            reject()
        }
    })
}

function promiseArrayFindIndex(arr, step, callback) {
    return new Promise(function (resolve) {
        let maxCountReject = Math.ceil(arr.length / step)
        let countReject = 0

        for (let i = 0; i < arr.length; i = i + step) {
            let max = i + step

            if (max > arr.length) {
                max = arr.length
            }

            promiseSubarrayFindIndex(arr, i, max, callback)
                .then(
                    function (findIndex) {
                        resolve(findIndex)
                    },
                    function () {
                        countReject = countReject + 1

                        if (maxCountReject === countReject) {
                            resolve(-1)
                        }
                    }
                )
        }
    })
}

async function main(arrayLength, step) {
    let findIndex
    
    const arr = arrayGenerate(arrayLength, itemGenerate)

    const findId = arrayLength

    function callback(item) {
        return item.id === findId
    }

    consoleLogDateString('Время начала поиска по массиву')

    findIndex = arr.findIndex(callback)


    consoleLogDateString('Время конца поиска по массиву')

    console.log('Индекс элемента: ' + findIndex)

    consoleLogDateString('Время начала асинхроного поиска по массиву')

    findIndex = await promiseArrayFindIndex(arr, step, callback)

    consoleLogDateString('Время конца асинхроного поиска по массиву')

    console.log('Индекс элемента: ' + findIndex)

    return
}

main(100000000, 10000)
