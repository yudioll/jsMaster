/**
 * 冒泡排序
 * @param {Array} array 
 */
const bubble = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j+1], array[j]]
            }
        }        
    }
    return array
}

/**
 * 冒泡排序----优化1
 * @param {Array} array 
 */
const bubble1 = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) { //减去已经排好序的轮数
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j+1], array[j]]
            }
        }        
    }
    return array
}

/**
 * 选择排序
 * @param {Array} array
 */
const selecSort = (array) => {
    const { length } = array
    for (let i = 0; i < array.length - 1; i++) {
        let indexMin = i
        for (let j = i; j < array.length; j++) {
            if (array[indexMin] > array[j]) {
                indexMin = j
            }            
        }
        if (i !== indexMin) {
            [array[i], array[indexMin]] = [array[indexMin],array[i]]
        }
    }
    return array
}
const a = [1,10,9,8,111]
console.log(selecSort(a))