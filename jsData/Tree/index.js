const { TreeNode, compare } = require('./util')
class Tree {
    constructor (comparefn = compare) {
        this.root = null
        this.comparefn = comparefn
    }
    // 插入一个节点
    insert (key) {
        const keyNode = new TreeNode(key)
        if(this.root === null) {
            this.root = keyNode
        } else {
            this.insertNode(this.root, key)
        }
    }
    // 插入辅助函数
    insertNode (node, key) {
        if (this.comparefn(key, node.key) === 'lt') {
            if (node.left === null) {
                node.left = new TreeNode(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else  {
            if (node.right === null) {
                node.right = new TreeNode(key)
            }else {
                this.insertNode(node.right, key)
            }
        }
    }
    // 前序遍历
    inorder () {
        const printNode = node => console.log(node.key)
        this.inorderHelp(this.root, printNode)
    }
    // 前序遍历辅助
    inorderHelp (node, callback) {
        if(node !== null) {
            callback(node)
            this.inorderHelp(node.left, callback)
            this.inorderHelp(node.right, callback)
        }
    }
    // 中序遍历
    midorder () {
        const printNode = node => console.log(node.key)
        this.midorderHelp(this.root, printNode)
    }
    // 中序遍历辅助函数
    midorderHelp (node, callback) {
        if(node !== null) {
            console.trace()
            this.midorderHelp(node.left, callback)
            callback(node)
            this.midorderHelp(node.right, callback)
        }
    }
}
const t1 = new Tree()
t1.insert(10)
t1.insert(8)
t1.insert(6)
t1.insert(11)
t1.insert(12)
// t1.inorder()
t1.midorder()
