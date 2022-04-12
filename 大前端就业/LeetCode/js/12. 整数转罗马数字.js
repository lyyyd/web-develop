var intToRoman = function(num) {
    var hashmap = {'1000':'M', '900':'CM', '500':'D', '400':'CD', '100':'C', '90':'XC', '50':'L', '40':'XL', '10':'X', '9':'IX', '5':'V', '4':'IV', '1':'I'}
    
    var res = '';
    var hashmapKeys = Object.keys(hashmap).reverse();
    for (const key of hashmapKeys) {
        if (num / key != 0) {
            count = Math.floor(num / key)  // 比如输入4000，count 为 4
            res += strFun(hashmap[key], count)
            num %= key
        }
    }
    return res
};

var strFun = function(str, num) {
    var arr = [];
    for (let index = 0; index < num; index++) {
        arr.push(str);
    }
    return arr.join('');
}

console.log(intToRoman(2984));
