# js 实现栈

方法包含如下
1. pop 栈顶输出值
2. push 入栈
3. peek 输出栈顶值
4. isEmpty 是否为空
5. clear 清空栈

```js
class Stack {
    constructor () {
        // 使用数组的方案
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
```