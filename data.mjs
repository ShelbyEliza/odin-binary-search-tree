const array_A = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 600, 324];
const array_B = [];
const array_C = [10];
const array_D = [1, 7, 4, 23, 8, 9, 4, 3, 68, 5, 7, 9, 67, 600, 324];

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

export const data_A = sortArray(removeDuplicates(array_A));
export const data_B = sortArray(removeDuplicates(array_B));
export const data_C = sortArray(removeDuplicates(array_C));
export const data_D = sortArray(removeDuplicates(array_D));
