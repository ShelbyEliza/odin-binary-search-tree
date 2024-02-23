import { a, b, c, d } from './data.mjs';

import { sortArray, removeDuplicates, logThem } from './helper.mjs';

const aSorted = sortArray(removeDuplicates(a));
const cSorted = sortArray(removeDuplicates(c));

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
	cleanUpArray(arr) {
		return this.sortArray(this.removeDuplicates(arr));
	}
	removeDuplicates(arr) {
		return [...new Set(arr)];
	}
	sortArray(arr) {
		function compareNumbers(a, b) {
			return a - b;
		}
		return arr.sort(compareNumbers);
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
		function recurFind(value, current) {
			// base case:
			if (!current) {
				return null;
			}
			if (current.data === value) {
				return current;
			} else if (current.data > value) {
				return recurFind(value, current.left);
			} else if (current.data < value) {
				return recurFind(value, current.right);
			}
		}
		return recurFind(value, current);
	}

	printLevelOrder(current, queue) {
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

	recurLevelOrder(callback) {
		let current = this.root;
		let queue = [];
		if (current) {
			queue.push(current);
		}
		console.log(this);
		// no callback
		if (!callback) {
			return this.printLevelOrder(current, queue);
		} else {
			function reLevelO(current, queue, callback) {
				// base case:
				if (!current) {
					return;
				}
				if (current.left) {
					queue.push(current.left);
				}
				if (current.right) {
					queue.push(current.right);
				}
				// do a thing to current here
				callback(current);
				if (queue.length > 0) {
					queue.shift();
					current = queue[0];
					reLevelO(current, queue, callback);
				} else {
					current = null;
				}
			}

			if (!current) {
				return;
			}
			return reLevelO(current, queue, callback);
		}
	}

	levelOrder(callback) {
		let current = this.root;
		let queue = [];
		if (current) {
			queue.push(current);
		}
		// no callback
		if (!callback) {
			return this.printLevelOrder(current, queue);
		} else {
			while (current) {
				if (current.left) {
					queue.push(current.left);
				}
				if (current.right) {
					queue.push(current.right);
				}
				callback(current);
				if (queue.length > 0) {
					queue.shift();
					current = queue[0];
				}
			}
		}
	}

	inOrder(callback) {
		let current = this.root;
		let stack = [];
		if (current) {
			function recurInOrder(current) {
				if (!current) {
					return;
				}
				if (current.left) {
					recurInOrder(current.left);
				}
				if (callback) {
					callback(current);
				} else {
					stack.push(current.data);
				}
				if (current.right) {
					recurInOrder(current.right);
				}
			}
			recurInOrder(current, callback);
			if (!callback) {
				return stack;
			}
			return;
		}
	}

	preOrder(callback) {
		let current = this.root;
		let stack = [];
		if (current) {
			function recurPreOrder(current) {
				if (!current) {
					return;
				}
				if (callback) {
					callback(current);
				} else {
					stack.push(current.data);
				}
				if (current.left) {
					recurPreOrder(current.left);
				}
				if (current.right) {
					recurPreOrder(current.right);
				}
			}
			recurPreOrder(current, callback);
			if (!callback) {
				return stack;
			}
			return;
		}
	}

	postOrder(callback) {
		let current = this.root;
		let stack = [];
		if (current) {
			function recurPostOrder(current) {
				if (!current) {
					return;
				}
				if (current.left) {
					recurPostOrder(current.left);
				}
				if (current.right) {
					recurPostOrder(current.right);
				}
				if (callback) {
					callback(current);
				} else {
					stack.push(current.data);
				}
			}
			recurPostOrder(current, callback);
			if (!callback) {
				return stack;
			}
			return;
		}
	}

	height(value) {
		console.log(value);
		let start = this.find(value);
		let height = 0;

		if (start) {
			function getHeight(current) {
				console.log(current);
				if (!current) {
					return;
				}
				if (current.left) {
					height++;
					getHeight(current.left);
				} else if (current.right) {
					height++;
					getHeight(current.right);
				}
			}
			getHeight(start);
			return height;
		}
		return null;
	}

	depth(value) {
		let start = this.root;
		let depth = 0;

		if (start) {
			function getDepth(current) {
				if (current.data === value) {
					return depth;
				} else if (current.left && value < current.data) {
					depth++;
					return getDepth(current.left);
				} else if (current.right && value > current.data) {
					depth++;
					return getDepth(current.right);
				}
				return null;
			}
			return getDepth(start);
		} else {
			return null;
		}
	}

	isBalanced() {
		// let leftH;
		// let rightH;
		// let myThis = this;
		// let heights = this.recurLevelOrder(myThis.height.bind(this));
		// console.log(heights);
	}
	reBalance() {}
}

const tree = new Tree(aSorted);
// const treeC = new Tree(cSorted);
console.log(tree);
tree.prettyPrint(tree.root);

// tree.delete(9);
// tree.delete(3);
// tree.insert(102);

// console.log(tree.levelOrder(height.bind()));
// console.log(tree.isBalanced());
// treeC.delete(2);
// treeC.delete(6);
// treeC.delete(7);

// tree.prettyPrint(tree.root);

// tree.levelOrder(logThem);
// console.log(tree.postOrder());
// console.log(tree.levelOrder());
// console.log(tree.find(600));

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
