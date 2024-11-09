import "./normalize.css";
import "./styles.css";
import { Tree } from "./classes";

document.addEventListener("DOMContentLoaded", () => {
    let tree;
    // window.tree = tree; // Make `tree` accessible globally

    function logNode(node) {
        console.log(node.data);
    }

    // 1. Create a binary search tree from an array of random numbers < 100.
    function createBST(size) {
        let arr = [];
        for (let i = 0; i < size; i++) {
            arr.push(Math.floor(Math.random() * 100));
        }
        tree = new Tree(arr);
        tree.buildTree(arr);
        console.log(tree.root);
    }
    createBST(20);
    tree.levelOrder(logNode);

    // 2. Confirm tree is balanced
    console.log("Is the tree balanced initially? ", tree.isBalanced());

    // 3. Print elements in different traversal orders
    console.log("Level-order:");
    tree.levelOrder(logNode);
    console.log("Pre-order:");
    tree.preOrder(logNode);
    console.log("Post-order:");
    tree.postOrder(logNode);
    console.log("In-order:");
    tree.inOrder(logNode);

    // 4. Unbalance the tree by adding numbers > 100
    console.log("Adding numbers greater than 100 to unbalance the tree...");
    tree.insert(150);
    tree.insert(200);
    tree.insert(120);

    // 5. Confirm the tree is unbalanced
    console.log("Is the tree balanced after adding large numbers? ", tree.isBalanced());

    // 6. Balance the tree
    console.log("Rebalancing the tree...");
    tree.rebalance();

    // 7. Confirm the tree is balanced again
    console.log("Is the tree balanced after rebalancing? ", tree.isBalanced());

    // 8. Print elements in different traversal orders again after rebalancing
    console.log("Level-order after rebalancing:");
    tree.levelOrder(logNode);
});
