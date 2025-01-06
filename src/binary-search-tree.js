const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  root() {
    return this.rootNode || null;
  }

  add(data) {
    let node = this.root();
    if (!this.rootNode) return this.rootNode = new Node(data);
    while (node) {
      let direction = data < node.data ? 'left' : 'right';
      if (!node[direction]) return node[direction] = new Node(data);
      node = node[direction];
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let node = this.root();
    while (node) {
      if (data === node.data) return node;
      node = data < node.data ? node.left : node.right;
    }
    return null;
  }

  remove(data) {
    let node = this.root();
    let parentNode = null;
    let childNode = null;

    while (node.data !== data) {
      parentNode = node;
      node = data < node.data ? node.left : node.right;
    }

    if (node.left && node.right) {
      parentNode = node;
      childNode = node.left;

      while (childNode.right) {
        parentNode = childNode;
        childNode = childNode.right;
      }

      node.data = childNode.data;
      parentNode.left === childNode
        ? parentNode.left = childNode.left
        : parentNode.right = childNode.left;
    }

    else if (!node.left || !node.right) {
      childNode = node.left || node.right;
      node === this.rootNode
        ? this.rootNode = childNode
        : parentNode[node.data < parentNode.data ? 'left' : 'right'] = childNode;

    } else {
      node === this.rootNode
        ? this.rootNode = null
        : parentNode[node.data < parentNode.data ? 'left' : 'right'] = null;
     }
  }

  range(direction) {
    let node = this.root();
    while (node[direction]) node = node[direction];
    return node.data;
  }

  min() {
    return this.range('left')
  }

  max() {
    return this.range('right')
  }
}

module.exports = {
  BinarySearchTree
};