# js面试常见问题总结-day01
## 数组扁平化的一些方法
```js
// 第一种es6 flat
const a=[1,2,3,[4,[5]]]
console.log(a.flat(Infinity))

// 第二种
const str=JSON.stringify(a)
const newa=str.replace(/(\[|\])/g,'').split(',')

// 第三种 reduce+递归
function reducea(arr){
    return arr.reduce((pre,cur)=>{
        return pre.concat(Array.isArray(cur) ? reducea(cur) : cur)
    },[])
}

//第四种 直接递归
let ret=[]
function flata(arr){
    if(!arr.length) return ;
    for(let i=0;i<arr.length;i++){
        if(Array.isArray(arr[i])){
            flata(arr[i])
        }else{
            ret.push(arr[i])
        }
    }
}

// 第五种 while 配合some
while(a.some(Array.isArray)){
    a=[].concat(...a)
}
```
## 实现数组一些常用方法

* 实现map
```js
Array.prototype.mymap = function (cb,arg) {

    // cb 必须是一个回调函数
    if(Object.prototype.toString.call(cb) !== '[object Function]'){
        throw Error('cb must be a fn')
    }

    // this
    if(this === undefined || this === null){
        throw Error('connot read mymap propoty')
    }
    
    let O = Object(this)
    // 保证长度是正整数
    let len = O.length >>> 0
    let k = 0
    let Ret=[]
    for(; k < len; k++) {
        // 遍历原型链上的属性
        if(k in O){
          Ret[k] = cb.call(arg, O[k], k, O)
        }
    }
    return Ret
}
```
* 实现reduce方法
```js
Array.prototype.myreduce = function (cb,initval) {

    // cb 必须是一个回调函数
    if(Object.prototype.toString.call(cb) !== '[object Function]'){
        throw Error('cb must be a fn')
    }

    // this
    if(this === undefined || this === null){
        throw Error('connot read myreduce propoty')
    }
    
    let O = Object(this)
    // 保证长度是正整数
    let len = O.length >>> 0
    let k = 0
    let reduce=initval
    // 如果初始值未传入则使用第一个
    if(reduce===undefined){
        for(;k<len;k++){
            if(k in O){
                reduce=O[k]
                k++
                break;
            }
        }
    }
    if(k === len && reduce === undefined) 
    throw new Error('Each element of the array is empty');
    for(; k < len; k++) {
        // 遍历原型链上的属性
        if(k in O){
          reduce = cb.call(undefined, reduce, O[k], k, O)
        }
    }
    return reduce
}
```
* 实现数组push方法
```js
Array.prototype.mypush=function (...items) {
    if(this === undefined || this === null) {
        throw Error('connot read mypush propoty')
    }
    let O = Object(this)
    let len = O.length >>> 0
    let itemlen = items.length
    let k = 0
    if(len + itemlen > 2**53 -1){
        throw Error('too longer')
    }
    for(; k<itemlen;k++){
        O[len+k] = items[k]
    }
    let newlen = len + itemlen
    O.length=newlen
    return newlen
}
```
* 实现数组pop方法
```js
Array.prototype.mypop=function () {
    if(this === undefined || this === null) {
        throw Error('connot read mypush propoty')
    }
    let O = Object(this)
    let len = O.length >>> 0
    if(O.length===0){
        O.length=0
        return undefined
    }
    len--
    let ret
    ret = O[len]
    delete O[len]
    O.length = len
    return ret

}
```
* 实现数组filter方法
```js
Array.prototype.myfilter = function (cb,arg) {

    // cb 必须是一个回调函数
    if(Object.prototype.toString.call(cb) !== '[object Function]'){
        throw Error('cb must be a fn')
    }

    // this
    if(this === undefined || this === null){
        throw Error('connot read myreduce propoty')
    }

    let O = Object(this)
    let len = O.length >>> 0
    let k = 0
    let newlen=0
    let ret=[]
    for(;k < len; k++){
        if(k in O){
            let val = O[k]
            if(cb.call(arg, val, k, O)){
                ret[newlen++] = val
            }
        }
    }
    return ret
}
```
* 实现函数bind 方法
```js
Function.prototype.mybind = function (context, ...args){
    if(this === undefined || this === null) {
        throw Error('connot read mybind propoty')
    }

    var self = this

    var bfontion = function () {
        return self.apply(this instanceof self ? 
        this : 
        context,  args.concat(Array.prototype.slice.call(arguments)))
    }

    // 原型链接上
    bfontion.prototype = Object.create(self.prototype)

    return bfontion

}
```
* 实现call/apply
```js
Function.prototype.myCall = function (context, ...args) {
    if (typeof context === 'object') {
        context = context || window
    } else {
        context = Object.create(null)
    }
    let fn = Symbol()
    context[fn] = this

    let ret = context[fn](...args)
    delete context[fn]

    return ret
}
// apply
Function.prototype.myApply= function (context, args) {
    if (typeof context === 'object') {
        context = context || window
    } else {
        context = Object.create(null)
    }
    let fn = Symbol()
    context[fn] = this

    let ret = context[fn](...args)
    delete context[fn]

    return ret
}
```
* 数组中的浅拷贝和深拷贝
```js
// 实现浅拷贝-1
function shallowClone (target) {
    if(typeof target === 'object' && target !==null) {
        // 克隆的目标类型
        const cloneTarget = Array.isArray(target) ? [] : {}
        for( let prop in target) {
            // 过滤继承属性 hasOwnProperty
            if(target.hasOwnProperty(prop)) {
                cloneTarget[prop] = target[prop]
            }
        }
        return cloneTarget
    } else {
        return target
    }
}
```
