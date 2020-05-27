class Queue {
    constructor () {
        this.count = 0
        this.item = {}
        this.lowest = 0
    }
    enqueue(element){
        this.item[this.count] = element
        this.count ++
    }
    dequeue(){
        if(this.isEmpty()){
            return undefined
        }
        let ret = this.item[this.lowest]
        delete this.item[this.lowest]
        this.lowest++
        return ret
    }
    isEmpty(){
        return this.count - this.lowest === 0
    }
}
const q1 = new Queue()
q1.enqueue(1)
q1.enqueue(2)
q1.dequeue()
console.log('tag',q1)