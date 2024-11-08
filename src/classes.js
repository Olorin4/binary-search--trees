class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

export class Tree {
    constructor(array) {
        // Sort array and remove duplicates, then build the tree
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);
        this.root = this.buildTree(sortedArray);
    }

    // turns array into a balanced binary tree full of Node objects
    buildTree(array) {
        if (array.length === 0) return null;
        const mid = Math.floor(array.length / 2);
        const node = new Node(array[mid]);
        node.leftChild = this.buildTree(array.slice(0, mid));
        node.rightChild = this.buildTree(array.slice(mid + 1));
        return node;
    }

    insert(data, node = this.root) {
        if (node === null) return new Node(data);
        if (data < node.data) {
            node.leftChild = this.insert(data, node.leftChild);
        } else if (data > node.data) {
            node.rightChild = this.insert(data, node.rightChild);
        }
        // If data already exists, do nothing (no duplicates allowed)
        return node;
    }

    delete(data, node = this.root) {
        if (node === null) return null;
        if (data < node.data) {
            node.leftChild = this.delete(data, node.leftChild);
        } else if (data > node.data) {
            node.rightChild = this.delete(data, node.rightChild);
        } else {
            // Node with no child or only one child
            if (node.leftChild === null) return node.rightChild;
            if (node.rightChild === null) return node.leftChild;
            // Node with two children
            const successorNode = this.getSuccessorNodeOf(node.rightChild); // Find the in-order successor
            node.data = successorNode.data; // Replace data with successor's data
            node.rightChild = this.delete(node.rightChild, successorNode.data); // Delete successor
        }
        return node;
    }

    // finds the in-order successor of a given node
    getSuccessorNodeOf(currentNode) {
        currentNode = currentNode.rightChild;
        while (currentNode !== null && currentNode.leftChild !== null) {
            currentNode = currentNode.leftChild;
        }
        return currentNode;
    }

    find(data, node = this.root) {
        if (node === null) return null;
        if (data < node.data) {
            return this.find(data, node.leftChild);
        } else if (data > node.data) {
            return this.find(data, node.rightChild);
        }
        return node;
    }

    levelOrder(callback) {
        if (this.root === null) return; // If the tree is empty, do nothing
        const queue = [this.root]; // Initialize the queue with the root node
        while (queue.length > 0) {
            const node = queue.shift(); // Dequeue the front node
            callback(node);
            // Enqueue the left child if it exists
            if (node.leftChild) {
                queue.push(node.leftChild);
            }
            // Enqueue the right child if it exists
            if (node.rightChild) {
                queue.push(node.rightChild);
            }
        }
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
