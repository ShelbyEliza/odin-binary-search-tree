// filter method:
function filterOutDuplicates(arr) {
	return arr.filter((value, index) => data.indexOf(value) === index);
}

// Tree class function
function levelOrder(callback) {
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

export function logEvery(current, queue) {
	while (queue.length > 0) {
		if (current.left) {
			queue.push(current.left);
		}
		if (current.right) {
			queue.push(current.right);
		}
		// do a thing to current here
		console.log(current);
		queue.shift();
		current = queue[0];
	}
	return;
}

export function recurLogEvery(current, queue) {
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
	console.log(current);
	if (queue.length > 0) {
		queue.shift();
		current = queue[0];
		recurLogEvery(current, queue);
	} else {
		current = null;
	}
}
