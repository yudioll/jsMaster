class SetMy {
    constructor () {
        this.item = {}
    }
    // 检查集合是否有当前元素
    has (element) {
        return Object.prototype.hasOwnProperty.call(this.item,element)
    }
    // 添加元素
    add (element) {
        if(!this.has(element)) {
            this.item[element] = element
            return true
        }
        return false
    }
    // 删除元素
    remove (element) {
        if (this.has(element)) {
            delete this.item[element]
            return true
        }
        return false
    }
    // 清空集合
    clear () {
        this.item = {}
    }
    // 获取values
    values () {
        return Object.values(this.item)
    }
    // 并集
    union (otherSet) {
        let ret = new SetMy()
        otherSet.values().forEach(element => {
            ret.add(element)
        });
        this.values().forEach(element => {
            ret.add(element)
        })
        return ret
    }
    // 交集
    inserSession (otherSet) {
        let ret = new SetMy()
        let otherValues = otherSet.values()
        let values = this.values()
        console.log(otherValues)
        console.log(values)
        let big = values
        let small = otherValues
        if (otherValues - values > 0) {
            big = otherValues
            small = values
        }
        small.forEach(element => {
            if (big.includes(element)) {
                ret.add(element)
            }
        })
        return ret
    }
    // 差集
    diffSet (otherSet) {
        let diff = new SetMy()
        let values = this.values()
        values.forEach(element => {
            if(!otherSet.has(element)) {
                diff.add(element)
            }
        })
        return diff
    }
    // 子集
    isChild (otherSet) {
        let otherValues = otherSet.values()
        let values = this.values()
        if (otherValues.length > values.length) {
            return false
        } else {
            return otherValues.every((element) => {
                return values.includes(element)
            })
        }
    }
}