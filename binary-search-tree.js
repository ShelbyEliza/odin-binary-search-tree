import { data_A, data_B, data_C, data_D } from './data.mjs';

class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(arr) {
		this.arr = arr;
		this.lastIndex = this.findLastIndex(arr);
		this.root = this.buildTree(arr, 0, this.lastIndex);
	}
	findLastIndex(arr) {
		let lastIndex = arr.length - 1;
		if (lastIndex) {
			return lastIndex;
		}
		throw new Error('Array is too short. Must be greater than 1.');
	}
	buildTree(arr, startIndex, endIndex) {
		/** Cases to consider 
		 * Empty Array:
		if (arr.length < 1) {
			return null;
		}
		* Array of 1:
		if (arr.length === 1) {
			return new Node(arr[0], null, null);
		} 
		*/

		// Base case:
		if (startIndex > endIndex) {
			return null;
		}

		// find mid:
		let midIndex = parseInt((startIndex + endIndex) / 2);
		let node = new Node(arr[midIndex]);

		node.left = this.buildTree(arr, startIndex, midIndex - 1);
		node.right = this.buildTree(arr, midIndex + 1, endIndex);

		return node;
	}

	prettyPrint(node, prefix = '', isLeft = true) {
		if (node === null) {
			return;
		}
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? '│   ' : '    '}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	}
	/**
	 *
	 * @param {value to add to tree} value
	 * declare and set current to this.root
	 * along with value, current is used as a parameter of reInsert
	 * current becomes set to the return reInsert
	 */
	insert(value) {
		let current = this.root;
		current = this.reInsert(current, value);
	}

	/**
	 * @param {current root element} current
	 * @param {value to add to tree} value
	 * @returns a new root value or the new Node(value)
	 * base case: if current is null there are no more branches to traverse. set current to a new Node using the value provided and return that node
	 *
	 * until base case is met: check whether current.data is greater or less than value. if greater than: set current.left to the return of reInsert(current.left, value). recursively use the left value until untrue and vice versa with right and less than.
	 * return the current element if value is equal to current node (no duplicates!)
	 *
	 */
	reInsert(current, value) {
		// base case:
		if (!current) {
			current = new Node(value);
			return current;
		}
		if (current.data > value) {
			current.left = this.reInsert(current.left, value);
		} else if (current.data < value) {
			current.right = this.reInsert(current.right, value);
		}
		return current;
	}
	/**
	 *
	 * @param {value to delete} value
	 * case 1: delete leaf (end of branch) - set parent branch to null
	 * case 2: delete node with one child - point its parent to its child
	 * case 3: delete node with two children - replace with next biggest
	 */
	delete(value) {
		let current = this.root;
		current = this.reDelete(current, value);
	}

	reDelete(
		current,
		value,
		parent = null,
		children = { left: null, right: null }
	) {
		// console.log(parent);
		if (parent) {
			if (!children.left && !children.right) {
				// console.log(parent);
				if (parent.right.data == value) {
					parent.right = null;
				} else if (parent.left.data == value) {
					parent.left = null;
				}
				current = null;
				return current;
			} else {
				// console.log(children);
				if (children.left && children.right) {
					// handle 2 children
				} else if (children.left && !children.right) {
					// console.log(children);
					if (parent.right.data == value) {
						parent.right = children.left;
						current = children.left;
					} else if (parent.left.data == value) {
						parent.left = children.left;
						current = children.left;
					}
				} else if (!children.left && children.right) {
					if (parent.right.data == value) {
						// parent.right = children.right;
						current = children.right;
					} else if (parent.left.data == value) {
						parent.left = children.right;
						current = children.right;
					}
				}
			}
			return current;
		}

		if (current.data > value) {
			console.log(`${current.data} is greater than ${value}`);
			if (current.left.data == value) {
				let target = current.left;
				parent = current;
				if (target.left) {
					children.left = target.left;
				}
				if (target.right) {
					children.right = target.right;
				}
			}
			current.left = this.reDelete(current.left, value, parent, children);
		} else if (current.data < value) {
			console.log(`${current.data} is less than ${value}`);
			if (current.right.data == value) {
				let target = current.right;
				parent = current;
				if (target.right) {
					children.right = target.right;
				}
				if (target.left) {
					children.left = target.right;
				}
			}
			current.right = this.reDelete(current.right, value, parent, children);
		}
		return current;
	}

	find(value) {}
	levelOrder(callback) {}
	inOrder(callback) {}
	preOrder(callback) {}
	postOrder(callback) {}
	height(node) {}
	depth(node) {}
	isBalanced() {}
	reBalance() {}
}

// const tree_B = new Tree(data_B);
// const tree_C = new Tree(data_C);
// tree_B.prettyPrint(tree_B.root);
// tree_C.prettyPrint(tree_C.root);

// const tree_D = new Tree(data_D);
// tree_D.prettyPrint(tree_D.root);

const tree_A = new Tree(data_A);
console.log(data_A);
// tree_A.delete(600);
tree_A.delete(1);
tree_A.delete(9);
tree_A.delete(5);
tree_A.delete(600);

tree_A.prettyPrint(tree_A.root);
// console.log(tree_A);

// tree_A.insert(680);
// tree_A.insert(681);
