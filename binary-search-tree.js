import { a, b, c, d } from './data.mjs';

import {
	logEvery,
	recurLogEvery,
	sortArray,
	removeDuplicates,
} from './helper.mjs';

const aSorted = sortArray(removeDuplicates(a));

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
	buildTree(arr, startIndex, endIndex) {
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
		children = { toLeft: null, toRight: null }
	) {
		// console.log(current, parent, children);
		if (parent) {
			// case 1: target has no children
			if (!children.toLeft && !children.toRight) {
				if (parent.right.data == value) {
					parent.right = null;
				} else if (parent.left.data == value) {
					parent.left = null;
				}
				current = null;
				return current;
			} else {
				// case 3: target has 2 children
				// next is the value to the right of target then all the way left
				if (children.toLeft && children.toRight) {
					let next = this.findNext(children.toRight);

					// console.log(parent, current, next, children.toLeft, children.toRight);
					if (children.toRight.left) {
						children.toRight.left = null;
					}
					if (next.data !== children.toRight.data) {
						next.right = children.toRight;
					}
					next.left = children.toLeft;
					current = next;
					// case 2: target has only 1 child
				} else if (children.toLeft && !children.toRight) {
					if (parent.right.data == value) {
						current = children.toLeft;
					} else if (parent.left.data == value) {
						current = children.toLeft;
					}
				} else if (!children.toLeft && children.toRight) {
					if (parent.right.data == value) {
						current = children.toRight;
					} else if (parent.left.data == value) {
						current = children.toRight;
					}
				}
			}
			return current;
		}

		if (current.data > value) {
			// console.log(`${current.data} is greater than ${value}`);
			if (current.left && current.left.data == value) {
				let target = current.left;
				parent = current;
				if (target.left) {
					children.toLeft = target.left;
				}
				if (target.right) {
					children.toRight = target.right;
				}
			}
			current.left = this.reDelete(current.left, value, parent, children);
		} else if (current.data < value) {
			// console.log(`${current.data} is less than ${value}`);
			if (current.right.data == value) {
				let target = current.right;
				parent = current;
				if (target.right) {
					children.toRight = target.right;
				}
				if (target.left) {
					children.toLeft = target.left;
				}
			}
			current.right = this.reDelete(current.right, value, parent, children);
		}
		return current;
	}

	findNext(current) {
		if (current.left) {
			while (current.left) {
				current = current.left;
			}
		}
		return current;
	}

	find(value) {
		let current = this.root;
		return this.recurFind(value, current);
	}

	recurFind(value, current) {
		// base case:
		if (!current) {
			return 'Value not found in tree.';
		}
		if (current.data === value) {
			return current;
		} else if (current.data > value) {
			return this.recurFind(value, current.left);
		} else if (current.data < value) {
			return this.recurFind(value, current.right);
		}
	}

	printInOrder(current, queue) {
		let count = 0;
		let currIndex = 0;
		let returnArray = [current.data];

		while (current) {
			if (current.left) {
				queue.push(current.left);
				returnArray.push(current.left.data);
				count++;
			}
			if (current.right) {
				queue.push(current.right);
				returnArray.push(current.right.data);
				count++;
			}
			if (count == currIndex) {
				return returnArray;
			} else {
				currIndex++;
				current = queue[currIndex];
			}
		}
		return queue;
	}

	inOrder(callback) {}
	preOrder(callback) {}
	postOrder(callback) {}
	height(node) {}
	depth(node) {}
	isBalanced() {}
	reBalance() {}

	/**
	 *
	 * @param {*} callback
	 * runs callback on every node, starting at root,
	 * adds child nodes to a queue and goes through each level
	 */
	levelOrder(callback) {
		let current = this.root;
		let queue = [];
		if (current) {
			queue.push(current);
		}
		if (callback) {
			callback(current, queue);
		} else {
			return this.printInOrder(current, queue);
		}
	}
}

const tree = new Tree(aSorted);
console.log(tree);
tree.prettyPrint(tree.root);

// tree.levelOrder(logEvery);
// tree.levelOrder(recurLogEvery);
// console.log(tree.levelOrder());

// console.log(tree.root);
// console.log(treeA.find(9));
// treeA.insert(59);
// treeA.delete(100);
// treeA.delete(67);
// treeA.delete(4);

// treeA.prettyPrint(treeA.root);
// console.log(tree_A);

// tree_A.insert(680);
// tree_A.insert(681);
