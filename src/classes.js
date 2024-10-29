class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = this.buildTree();
    }

    // turns array into a balanced binary tree full of Node objects
    buildTree() {
        //return the level-0 root node
    }

    insert(value) {}
    deleteItem(value) {}

    find(value) {
        //returns the node with the given value
    }

    levelOrder(callback) {
        //traverse the tree in breadth-first level order and call the callback on each node
    }

    inOrder(callback) {}
    preOrder(callback) {}
    postOrder(callback) {}

    height(node) {
        //returns the given node’s height
    }

    depth(node) {
        //returns the given node’s depth
    }

    isBalanced() {
        //checks if the tree is balanced
    }

    rebalance() {}
}
