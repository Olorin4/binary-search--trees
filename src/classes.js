class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(array) {
        // Sort array and remove duplicates, then build the tree
        const sortedArray = [...new Set(array)].sort((a, b) => {
            return a - b;
        });
        this.root = this.buildTree(sortedArray);
    }

    // turns array into a balanced binary tree full of Node objects
    buildTree(array) {
        // Base case
        if (array.length === 0) return null;

        // Find middle index
        const mid = Math.floor(array.length / 2);

        // Create a new node with the middle value
        const node = new Node(array[mid]);

        // Recursively build left and right subtrees
        node.left = this.buildTree(array.slice(0, mid));
        node.right = this.buildTree(array.slice(mid + 1));

        return node;
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
