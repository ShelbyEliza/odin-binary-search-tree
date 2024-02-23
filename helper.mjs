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

export function logThem(value) {
	console.log(value);
}
