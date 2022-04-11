/**
 * @param {number} x
 * @return {boolean}
 */

 var isPalindrome = function(x) {
    if(x < 0)
            return false;
        var cur = 0;
        var num = x;
        while(num != 0) {
            cur = cur * 10 + num % 10;
            num = Math.floor(num/10);
        }
        return cur === x;
};

// class Solution {
//     constructor() {}
//     test(x) {
//         if(x < 0)
//             return false;
//         var cur = 0;
//         var num = x;
//         while(num != 0) {
//             cur = cur * 10 + num % 10;
//             num = Math.floor(num/10);
//         }
//         return cur === x;
//     }
// }

// var solution = new Solution();
// var isPalindrome = solution.test(121);
// console.log('isPalindrome', isPalindrome)