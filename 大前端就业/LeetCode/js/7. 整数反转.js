/**
 * @param {number} x
 * @return {number}
 */
// 解法一
var reverse = function(x) {
    var str = String(x);
    if (str[0] === '-') {
        str = str.split('').slice(1, str.length).reverse().join('');
        rev = -Number(str);
        return overflowNum(rev) === 0 ? 0 : rev;
    }else{
        str = str.split('').reverse().join('');
        rev = Number(str);
        return overflowNum(rev) === 0 ? 0 : rev;
    }
};

var overflowNum = (num) => {
    if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
        return 0;
    }
}

// 解法二
var reverse2 = function(x) {
    let rev = 0;
    while (x !== 0) {
        const digit = x % 10; // 得到余数 -4 -2 -3
        x = ~~(x / 10); // 得到除数 -32 -3 0
        rev = rev * 10 + digit; // 得到新的翻转后的数 0*10 + -4 = -4， -4*10 + -2 = -42，    -42*10 + -3 = -423
        if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return rev;
};

console.log(reverse(-123));
console.log(reverse2(-324));