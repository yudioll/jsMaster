class NodeEl {
    constructor (el) {
        this.el = el
        this.next = null
    }
}

function defaultequal(a,b){
    return a === b
}

module.exports = {
    NodeEl,
    defaultequal
}
