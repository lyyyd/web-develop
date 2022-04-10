var longestPalindrome = (s) => {
    if (s == null || s.length < 1) {
        return "";
    }
    let start = 0, end = 0;
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(s, i, i);     // 寻找1个字母为中心的对称数
        let len2 = expandAroundCenter(s, i, i + 1); // 2个字母为中心，中间两个字母相同，左右对称的数
        let len = Math.max(len1, len2);
        if (len > end - start + 1) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start.toFixed(0), end + 1);
}

function expandAroundCenter(s, left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        --left;
        ++right;
    }
    return right - left - 1;
}

console.log(longestPalindrome('aaa'));   // aaa
console.log(longestPalindrome('aaaa'));  // aaaa
console.log(longestPalindrome('cbbd'));  // bb
console.log(longestPalindrome('babad'));    // bab
console.log(longestPalindrome('beabaed'));  // eabae