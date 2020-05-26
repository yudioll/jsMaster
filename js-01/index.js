// 第一种es6
let a = [1, 2, 3];
/**
 * Array.prototype.mymap = function (cb,arg) {

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


const b= a.mymap((k)=>{
    return k+=1
})
console.log(b)
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
    for(; k < len; k++) {
        // 遍历原型链上的属性
        if(k in O){
          reduce = cb.call(undefined, reduce, O[k], k, O)
        }
    }
    return reduce
}
const b = a.myreduce((pre,cur)=>{
    return pre+cur
},1)
console.log(b)

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
a.mypush(1,undefined,3,4)
console.log(a)

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
console.log(a.mypop())
console.log(a)

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

const b = a.myfilter((i)=>{
    return i>2
})
console.log(b)

Function.prototype.mybind = function (context, ...args){
    if(this === undefined || this === null) {
        throw Error('connot read mybind propoty')
    }

    var self = this

    var bfontion = function () {
        return self.apply(this instanceof self ? this : context,  args.concat(Array.prototype.slice.call(arguments)))
    }

    // 原型链接上
    bfontion.prototype = Object.create(self.prototype)

    return bfontion

}
var obj1 = {
    name:'aaa',
    logName:function(){
        console.log(this.name)
        return this
    }
}
var obj2 = {
    name:'bbb',
    logName:obj1.logName
}

console.log(obj1.logName.mybind(obj2)())

let obj = {
    a: function() {
      console.log(this);
    }
  }
let func = obj.a;
func();

Function.prototype.newCall = function (context) {
    console.log(this)
    context.fn = this;  // this 指的是 say 函数
    context.fn();
    delete context.fn;
}

var person = {
    name: "jayChou"
};

var say = function() {
    console.log(this)
    console.log(this.name);
}

say.newCall(person);  // jayChou

Function.prototype.myApply= function (context, args) {
    if (typeof context === 'object') {
        context = context || global
    } else {
        context = Object.create(null)
    }
    let fn = Symbol()
    context[fn] = this

    let ret = context[fn](...args)
    delete context[fn]

    return ret
}

let say=function(name,age){
    return name+':'+age
}
const str = say.myApply(null,['asd',10])
console.log(str)
 */

// 实现浅拷贝
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
const a1 = [1,2,3,4,{name:'asd'}]
const b1 = shallowClone(a1)
b1[4].name='sss'
console.log(a1)
console.log(b1)


