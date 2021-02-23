function findIndex(arr, start, stop, callback) {
    for (let index = start; index < stop; index++) {
        if (callback(arr[index])) {
            return index
        }
    }

    return -1
}

function asyncArrayFindIndex(arr, callback, subarrLength = 10000) {
    return new Promise(function (resolve) {
        const maxCount = arr.length
        const maxCountReject = Math.ceil(maxCount / subarrLength)

        for (let start = 0, stop = subarrLength, countReject = []; start < maxCount; start += subarrLength, stop += subarrLength) {
            if (stop > maxCount) {
                stop = maxCount
            }

            new Promise(function (resolve, reject) {
                const index = findIndex(arr, start, stop, callback)

                if (index > -1) {
                    resolve(index)
                } else {
                    reject()
                }
            }).then(
                function (index) {
                    resolve(index)
                },
                function () {
                    countReject.push(-1)

                    if (maxCountReject === countReject.length) {
                        resolve(-1)
                    }
                }
            )
        }
    })
}

module.exports = {
    asyncArrayFindIndex: asyncArrayFindIndex
}