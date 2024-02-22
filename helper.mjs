export function sortArray(arr) {
	function compareNumbers(a, b) {
		return a - b;
	}
	return arr.sort(compareNumbers);
}

// set method:
export function removeDuplicates(arr) {
	return [...new Set(arr)];
}

// filter method:
function filterOutDuplicates(arr) {
	return arr.filter((value, index) => data.indexOf(value) === index);
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
		logEvery(current, queue);
	} else {
		current = null;
	}
}
