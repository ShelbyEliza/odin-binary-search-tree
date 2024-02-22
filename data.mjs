function sortArray(arr) {
	function compareNumbers(a, b) {
		return a - b;
	}
	return arr.sort(compareNumbers);
}
// filter method:
function filterOutDuplicates(arr) {
	return arr.filter((value, index) => data.indexOf(value) === index);
}
// set method:
function removeDuplicates(arr) {
	return [...new Set(arr)];
}
export const a = sortArray(
	removeDuplicates([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 100, 600, 324])
);
export const b = sortArray(removeDuplicates([]));
export const c = sortArray(removeDuplicates([10]));
export const d = sortArray(
	removeDuplicates([1, 2, 3, 4, 5, 6, 7, 14, 10, 23, 9, 9, 67, 6, 32, 20, 31])
);
