# 函数
## 存储函数
```js
/**
 * 某些例子中（例如， 我们需要管理某个事件发生后需要调用的回调
    函数集合） ， 我们会存储元素唯一的函数集合。 当我们向这样的集合中
    添加函数时， 会面临两个问题： 哪个函数对于这个集合来说是一个新函
    数， 从而需要被加入到该集合中？ 又是哪个函数已经存在于集合中， 从
    而不需要再次加入到集合中？ 一般来说， 管理回调函数集合时， 我们并
    不希望存在重复函数， 否则一个事件会导致同一个回调函数被多次调
    用
 */
var store={
    nextId:1,
    cache:{},
    add:function(fn){
       if(!fn.id){
           fn.id=this.nextId++
           this.cache[fn.id]=fn//用键值对存储fn
           console.log('tag', this.cache)
       }else{
           console.log('tag1', this.cache)
       }
    }
}
function a(){

}
function b(){

}
store.add(a)
store.add(a) //不会存到cache中
store.add(b)// tag { '1': [Function: a] { id: 1 }, '2': [Function: b] { id: 2 } }
```

## 自记忆函数
```js
function isPrime(num){
    if(!isPrime.answer){//不存在，构建answer 存储
        isPrime.answer={}
    }else{
        console.log('tag', '不是第一次执行了')
    }
    if(isPrime.answer[num]!==undefined){ // 如果算过这个值，直接返回
        return isPrime.answer[num]
    }
    var prime= num !== 0 && num !==1
    for(let i=2;i<num;i++){
        if(num % i === 0){
            prime=false
            console.log('tag', num +' is  a prime')
            break;
        }
    }
    return isPrime.answer[num] = prime;
}
isPrime(5)
console.log(isPrime)
isPrime(6)
console.log(isPrime)
isPrime(5)
console.log(isPrime)
/**
 * [Function: isPrime] { answer: { '5': true } }
tag 不是第一次执行了
tag 6 is  a prime
[Function: isPrime] { answer: { '5': true, '6': false } }
tag 不是第一次执行了
[Function: isPrime] { answer: { '5': true, '6': false } }
 */


```

## 函数定义
* 函数声明和函数表达式
* 箭头函数
* 构造函数声明-不常用 new Function('a','b','return a + b')
* 生成器函数 ES6

立即执行函数4中简单写法
* +function(){}()
* -function(){}()
* !function(){}()
* ~function(){}()

## 函数的形参和实参
* 形参是我们声明函数所给的变量

        形参是在声明函数时候指定，所有函数都有形参
* 实参是我们调用函数所传递给函数的值

        实参和函数调用时候相联系
## 剩余参数和默认参数
* 剩余参数
```js
/**
 * @description 剩余参数
 * 构建一个函数， 它会将第一个参数与余下参
 * 数中最大的数相乘。
 */
+function rest(first,...restArguments){
    return first*restArguments.sort((val1,val2)=>val2-val1)[0]
}(1,2,13,43,14,6)
```
## 函数进阶：理解函数调用
* this问题
```js
function a(){
    // 非严格模式是window node环境中是global
    return this
}
function b(){
    // 严格模式this是undefined
    'use strict'
    return this
}
console.log('tag-a', a())
console.log('tag-b', b())
```
当函数作为某个对象的方法被
调用时， 该对象会成为函数的上下文， 并且在函数内部可以通过参数访
问到。 这也是JavaScript实现面向对象编程的主要方式之一

```js
let obj={
    name:'a'
}
obj.a=function(){
    console.log('-this', this)// { name: 'a', a: [Function (anonymous)] }
    return this.name //tag a
}
console.log('tag', obj.a())
```
* 构造函数的this值
```js
function  Ninja(){
    this.a=function(){
        return this
    }
}
var a1 = new Ninja()
var a2 = new Ninja()
console.log('tag', a1.a() === a1) //true
console.log('tag', a2.a() === a2) //true

```
new 一个构造函数都发生了什么

* 创建一个空对象
* 这个空对象作为上下文传入构造函数
* 新构造的对象作为new操作符的返回值
