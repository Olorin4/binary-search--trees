import "./normalize.css";
import "./styles.css";
import { Tree } from "./classes";

document.addEventListener("DOMContentLoaded", () => {
    const arr = [3, 5, 1, 4, 2, 6, 7];
    const tree = new Tree(arr);
    console.log(tree.root);
});
