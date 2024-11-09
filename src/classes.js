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
        if (node === null) {
            console.error(`Error: Data ${data} not found in the tree.`);
            return null;
        }
        if (data < node.data) {
            node.leftChild = this.delete(data, node.leftChild);
        } else if (data > node.data) {
            node.rightChild = this.delete(data, node.rightChild);
        } else {
            // Node with no child or only one child
            if (node.leftChild === null) return node.rightChild;
            if (node.rightChild === null) return node.leftChild;
            // Node with two children
            let successorNode = node.rightChild;
            while (successorNode.leftChild !== null) {
                successorNode = successorNode.leftChild; // Find the smallest node in the right subtree
            }
            node.data = successorNode.data; // Replace data with successor's data
            node.rightChild = this.delete(successorNode.data, node.rightChild); // Delete successor
        }
        return node;
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
        Tree.validate(callback);
        const queue = [this.root]; // Initialize the queue with the root node
        while (queue.length > 0) {
            const node = queue.shift(); // Dequeue the front node
            callback(node);
            if (node.leftChild) queue.push(node.leftChild); //Enqueue the left child
            if (node.rightChild) queue.push(node.rightChild); //Enqueue the right child
        }
    }

    inOrder(callback, node = this.root) {
        Tree.validate(callback);
        if (node === null) return;
        if (node.leftChild) this.inOrder(callback, node.leftChild); // Visit left subtree
        callback(node); // Visit current node
        if (node.rightChild) this.inOrder(callback, node.rightChild); // Visit right subtree
    }

    preOrder(callback, node = this.root) {
        Tree.validate(callback);
        if (node === null) return;
        callback(node); // Visit current node
        if (node.leftChild) this.preOrder(callback, node.leftChild); // Visit left subtree
        if (node.rightChild) this.preOrder(callback, node.rightChild); // Visit right subtree
    }

    postOrder(callback, node = this.root) {
        Tree.validate(callback);
        if (node === null) return;
        if (node.leftChild) this.postOrder(callback, node.leftChild); // Visit left subtree
        if (node.rightChild) this.postOrder(callback, node.rightChild); // Visit right subtree
        callback(node); // Visit current node
    }

    height(node = this.root) {
        const result = this._calculateHeightAndBalance(node);
        return result.height;
    }

    depth(node, current = this.root) {
        if (node === null) return -1;
        if (node === this.root) return 0; // If the node is the root, its depth is 0
        // Recursive case: Search in the left or right subtree
        if (node.data < current.data) {
            // Go left, and increment depth by 1
            return 1 + this.depth(node, current.leftChild);
        } else if (node.data > current.data) {
            // Go right, and increment depth by 1
            return 1 + this.depth(node, current.rightChild);
        }
        // If neither left nor right child has a valid depth, return -1 (node not found in the tree)
        return -1;
    }

    isBalanced(node = this.root) {
        const result = this._calculateHeightAndBalance(node);
        return result.balance;
    }

    rebalance() {
        if (this.isBalanced()) return;
        const rebalancedTree = [];
        // Collect all node data from the tree using inOrder traversal
        this.inOrder((node) => rebalancedTree.push(node.data));
        // Rebuild the tree with the sorted data
        this.root = this.buildTree(rebalancedTree);
    }

    // Static helper function to check if a valid callback is provided
    static validate(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
    }

    // Helper function to calculate both height and balance status of a node
    _calculateHeightAndBalance(node) {
        if (node === null) return { height: -1, balance: true }; // Base case: null node is balanced
        // Check balance and height of left subtree
        const left = this._calculateHeightAndBalance(node.leftChild);
        if (!left.balance) return { height: 0, balance: false }; // If left subtree is unbalanced, no need to check further
        // Check balance and height of right subtree
        const right = this._calculateHeightAndBalance(node.rightChild);
        if (!right.balance) return { height: 0, balance: false }; // If right subtree is unbalanced, no need to check further
        // Check if current node is balanced (difference in heights not more than one)
        const isBalancedAtNode = Math.abs(left.height - right.height) <= 1;
        // Return the height of the current node and its balance status
        const height = Math.max(left.height, right.height) + 1;
        return { height, balance: isBalancedAtNode };
    }
}
