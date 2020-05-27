class Stack {
    constructor () {
        this.count = 0 //作为对象的键
        this.list = {}
    }
    // 入栈一次只允许添加一个
    push(item) {
        this.list[this.count] = item
        this.count++
    }
    peek(){
        if(this.count === 0) {
            return undefined
        }
        return this.list[this.count-1]
    }
    pop(){
        if(this.count === 0) {
            return undefined
        }
        this.count--
        let ret = this.list[this.count]
        delete this.list[this.count]
        return ret
    }
    isEmpty(){
        return this.count === 0
    }
    clear() {
        this.count = 0
        this.list = {}
    }
}
const n1 = new Stack()
n1.push(1)
console.log(n1)

const peek=n1.peek()
console.log(peek)
