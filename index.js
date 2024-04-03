import { a } from './data.mjs';

import { sortArray, removeDuplicates } from './helper.mjs';

import { Tree } from './binary-search-tree.js';

const aSorted = sortArray(removeDuplicates(a));

const tree = new Tree(aSorted);
console.log(tree);
tree.prettyPrint(tree.root);

/** Delete nodes:
  tree.delete(1);
  tree.delete(3);
  tree.delete(5);
  tree.delete(7);
 */

/** Insert nodes: */
tree.insert(102);
tree.insert(104);
tree.insert(601);

// console.log(tree.height(8));
console.log(tree.depth(104));

tree.prettyPrint(tree.root);

// console.log(tree.iterativeLevelOrder(tree.height.bind(tree)));
tree.isBalanced();
