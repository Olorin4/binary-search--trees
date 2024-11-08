import "./normalize.css";
import "./styles.css";
import { Tree } from "./classes";

document.addEventListener("DOMContentLoaded", () => {
    const arr = [8, 3, 5, 1, 1, 4, 2, 6, 7, 7];
    let tree = new Tree(arr);
    console.log(tree.root);

    function logNode(node) {
        console.log(node.data);
    }
    tree = new Tree([10, 5, 15, 2, 7, 12]);
    tree.levelOrder(logNode);
});
