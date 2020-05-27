class Stack {
    constructor () {
        this.list = []
    }
    push(...items) {
        this.list.push(...items)
    }
    peek(){
        let len = this.list.length
        return this.list[len-1]
    }
    pop(){
        return this.list.pop()
    }
    isEmpty(){
        return this.list.length === 0
    }
    clear() {
        this.list = []
    }
}