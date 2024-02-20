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

	insert(value) {
		let current = this.root;
		current = this.reInsert(current, value);
	}

	reInsert(current, value) {
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

	delete(value) {}
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
const tree_D = new Tree(data_D);

// tree_B.prettyPrint(tree_B.root);
// tree_C.prettyPrint(tree_C.root);
tree_D.prettyPrint(tree_D.root);

console.log(data_A);
const tree_A = new Tree(data_A);
console.log(tree_A);
tree_A.insert(68);
tree_A.prettyPrint(tree_A.root);
