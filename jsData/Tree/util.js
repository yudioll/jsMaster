class TreeNode {
    constructor (key) {
        this.key = key
        this.left = null
        this.right = null
    }
}
function compare(keynew, keyold) {
    if(keynew < keyold) {
        return 'lt'
    } else {
        return 'gt'
    }
}
module.exports = {
    TreeNode,
    compare
}