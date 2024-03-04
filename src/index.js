import './style.css';
// import mergeSort from './sort';
import Node from './node';

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array, start = 0, end = array.length - 1) {
    const newArray = array
      .sort((a, b) => a - b)
      .filter((value, index) => array.indexOf(value) === index);

    if (start > end) return null;
    const mid = parseInt(newArray.length / 2, 10);
    const root = new Node(newArray[mid]);
    root.left = this.buildTree(newArray.slice(0, mid));
    root.right = this.buildTree(newArray.slice(mid + 1, newArray.length));

    return root;
  }

  insert(value, root = this.root, previous = null) {
    if (root === null) {
      if (value < previous.data) {
        previous.left = new Node(value);
      } else {
        previous.right = new Node(value);
      }
    } else if (value < root.data) {
      this.insert(value, root.left, root);
    } else if (value > root.data) {
      this.insert(value, root.right, root);
    } else {
      console.log('value already in the tree');
    }
  }

  deleteNode(value, root = this.root, previous = this, turn = 'root') {
    if (value < root.data) {
      return this.deleteNode(value, root.left, root, 'left');
    }
    if (value > root.data) {
      return this.deleteNode(value, root.right, root, 'right');
    }
    if (value === root.data) {
      if (!root.right && !root.left) {
        previous[turn] = null;
      } else if (root.left && !root.right) {
        previous[turn] = root.left;
      } else if (root.right && !root.left) {
        previous[turn] = root.right;
      } else if (root.left && root.right) {
        let newRoot = root.right;
        let newPrevious = root;
        let newTurn = 'right';
        while (newRoot.left) {
          newPrevious = newRoot;
          newRoot = newRoot.left;
          newTurn = 'left';
        }
        if (!newRoot.right) {
          newPrevious[newTurn] = null;
          newRoot.left = root.left;
          newRoot.right = root.right;
          previous[turn] = newRoot;
        } else {
          newPrevious.left = newRoot.right;
          newRoot.left = root.left;
          newRoot.right = root.right;
          previous[turn] = newRoot;
        }
      }
      return root;
    }
    return 'Value not found';
  }

  find(value, root = this.root) {
    if (value < root.data) {
      return this.find(value, root.left);
    }
    if (value > root.data) {
      return this.find(value, root.right);
    }
    if (value === root.data) {
      return root;
    }
    return null;
  }

  levelOrder(cb = node => cbArray.push(node), root = this.root, queue = [], cbArray = []) {
    cb(root);
    if (root.left) queue.push(root.left);
    if (root.right) queue.push(root.right);
    if (queue.length === 0) return cbArray;
    return this.levelOrder(cb, queue.shift(), queue, cbArray);
  }

  inOrder(cb = node => cbArray.push(node), root = this.root, cbArray = []) {
    if (root === null) return cbArray;
    this.inOrder(cb, root.left, cbArray);
    cb(root);
    this.inOrder(cb, root.right, cbArray);
    return cbArray;
  }

  preOrder(cb = node => cbArray.push(node), root = this.root, cbArray = []) {
    if (root === null) return cbArray;
    cb(root);
    this.preOrder(cb, root.left, cbArray);
    this.preOrder(cb, root.right, cbArray);
    return cbArray;
  }

  postOrder(cb = node => cbArray.push(node), root = this.root, cbArray = []) {
    if (root === null) return cbArray;
    this.postOrder(cb, root.left, cbArray);
    this.postOrder(cb, root.right, cbArray);
    cb(root);
    return cbArray;
  }

  height(value, root = this.find(value), counter = 0) {
    if (!root) return counter;
    if (root.right === null && root.left === null) return counter;
    if (root.left && !root.right) return this.height(value, root.left, counter + 1);
    if (root.right && !root.left) return this.height(value, root.right, counter + 1);
    const leftHeight = this.height(value, root.left, counter + 1);
    const rightHeight = this.height(value, root.right, counter + 1);
    if (leftHeight > rightHeight) return counter + leftHeight;
    return counter + rightHeight;
  }

  depth(value, root = this.root, counter = 0) {
    if (value < root.data) {
      return this.depth(value, root.left, counter + 1);
    }
    if (value > root.data) {
      return this.depth(value, root.right, counter + 1);
    }
    if (value === root.data) {
      return counter;
    }
    return null;
  }

  isBalanced() {
    let result = true;
    this.postOrder(root => {
      const leftHeight = this.height(root.data, root.left);
      const rightHeight = this.height(root.data, root.right);
      if (leftHeight > rightHeight + 1 || rightHeight > leftHeight + 1) result = false;
    });
    return result;
  }

  rebalance() {
    const isBalanced = this.isBalanced();
    if (isBalanced) return;
    const arrayValues = [];
    const treeArray = this.preOrder();
    treeArray.forEach(node => arrayValues.push(node.data));
    this.root = this.buildTree(arrayValues);
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);

console.log(tree.isBalanced());
tree.prettyPrint(tree.root);
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
console.log(tree.levelOrder());
tree.insert(120);
tree.insert(121);
tree.insert(122);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
console.log(tree.levelOrder());
tree.prettyPrint(tree.root);
