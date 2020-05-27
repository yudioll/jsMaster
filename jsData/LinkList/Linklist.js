const { NodeEl, defaultequal } = require('./utils')

// 实现链表类
class LinkList {
    constructor (equal = defaultequal) {
        this.head = null
        this.equal = equal
        this.count = 0
    }
    push (el) {
        let node = new NodeEl(el)
        let current = this.head
        if (this.head === null) {
            this.head = node
        } else {
            while (current.next !== null) {
                current = current.next
            }
            current.next = node
        }
        this.count++
    }
    getEl (index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head
            for (let i = 0;i<index;i++) {
                node = node.next
            }
            return node
        }
        return undefined
    }
    removeAt (index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                this.head = current.next
            } else {
                const previous = this.getEl(index -1)
                current = previous.next
                previous.next = current.next
            }
        }
        this.count--
    }
    indexOf (el) {
        if (this.count === 0) {
            return -1
        } else {
            let current = this.head
            for (let i = 0; i < this.count; i++){
                if (this.equal(el,current.el)){
                    return i
                }
                current = current.next
            }
            return -1
        }
    }
    remove (el) {
        let index = this.indexOf(el)
        console.log(index)
        return this.removeAt(index)
    }
}
