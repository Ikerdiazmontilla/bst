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

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.insert(20);
tree.insert(21);
console.log(tree.find(67));
tree.prettyPrint(tree.root);
// console.log(tree.root)

// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// console.log(array.sort((a, b) => a - b).filter((value, index) => array.indexOf(value) === index));

// console.log('New array', newArray);
// console.log('Mid', mid);
// console.log('array[mid]', newArray[mid]);
// console.log('newArray.slice()0,mid', newArray.slice(0, mid));
// console.log(
//   'newArray.slice(mid + 1, newArray.length',
//   newArray.slice(mid + 1, newArray.length)
// );
