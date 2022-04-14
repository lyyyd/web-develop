### 1. 两数之和

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。


**示例 1：**

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

**示例 2：**
```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

**示例 3：**
```
输入：nums = [3,3], target = 6
输出：[0,1]
```

**提示：**


* 2 <= nums.length <= 104
* -109 <= nums[i] <= 109
* -109 <= target <= 109
* 只会存在一个有效答案

**进阶**：你可以想出一个时间复杂度小于 O(n2) 的算法吗？

**题解**
```JavaScript
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0, len = nums.length; i < len; i++){
        // 1. 算出目标数字和当前数字的差
        // 2. 检查哈希表中是否存在该差，存在则返回结果
        if(map.has(target - nums[i])){ 
            return [map.get(target - nums[i]), i];
        // 3. 不存在，当前数字作为key，索引作为value存入哈希表
        }else{
            map.set(nums[i], i);
        }
    }
    return [];
};
```
```
执行用时：60 ms
内存消耗：42.2 MB
```
***

### 2. 两数相加
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例 1：**

输入：

> (2) ----> (4) ----> (3)

> (5) ----> (6) ----> (4)

结果：
> (7) ----> (0) ----> (8)

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

**示例 2：**
```
输入：l1 = [0], l2 = [0]
输出：[0]
```

**示例 3：**
```
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

**提示：**

* 每个链表中的节点数在范围 [1, 100] 内
* 0 <= Node.val <= 9
* 题目数据保证列表表示的数字不含前导零

方法一：模拟
思路与算法

由于输入的两个链表都是逆序存储数字的位数的，因此两个链表中同一位置的数字可以直接相加。

我们同时遍历两个链表，逐位计算它们的和，并与当前位置的进位值相加。具体而言，如果当前两个链表处相应位置的数字为 **n1, n2**进位值为**carry**，则它们的和为 **n1 + n2 + carry**；其中，答案链表处相应位置的数字为 **(n1 + n2 + carry)mod10**，而新的进位值为  ⌊ 
$$h_w(x)=\frac{n1 + n2 + carry}{10}$$ 
⌋。

如果两个链表的长度不同，则可以认为长度短的链表的后面有若干个 0。

此外，如果链表遍历结束后，有 **carry > 0**，还需要在答案链表的后面附加一个节点，节点的值为 **carry。**

**题解**

```JavaScript
var addTwoNumbers = function(l1, l2) {
    // 链表头 和 当前链表的位置
    let head = null, tail = null;
    // 进位
    let carry = 0;
    // 同时遍历两个链表l1 l2
    while (l1 || l2) {
        // 获取链表当前位置的值（指针）
        // 如果两个链表的长度不同，则可以认为长度短的链表的后面有若干个 0。
        const n1 = l1 ? l1.val : 0;
        const n2 = l2 ? l2.val : 0;
        // 计算当前位置的和
        const sum = n1 + n2 + carry;
        // 链表头为空， 则当前链表位置赋值，赋sum % 10 的余数
        if (!head) {
            head = tail = new ListNode(sum % 10);
        // 链表头不为空，链表下一个指针位置赋值，赋sum % 10 的余数
        } else {
            tail.next = new ListNode(sum % 10);
            // 链表当前位置tail，往后加一位（指针++）
            tail = tail.next;
        }
        // 计算进位（满十进一）
        carry = Math.floor(sum / 10);
        // 更新两个链表l1 和 l2位置(指针++)
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    // 最后一定记得，有进位的话，需要链表多出来一位存进位carry的值
    // 存在进位 则链表下一项进一位
    if (carry > 0) {
        tail.next = new ListNode(carry);
    }
    // 最后返回求和链表结果head
    return head;
};
```
```
执行用时：100 ms
内存消耗：46.7 MB
```

***

### 3. 无重复字符的最长子串
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

**示例 1:**

```
输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```
**示例 2:**

```
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```
**示例 3:**

```
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

**提示：**

* 0 <= s.length <= 5 * 104
* s 由英文字母、数字、符号和空格组成


方法一：滑动窗口
思路和算法

我们先用一个例子考虑如何在较优的时间复杂度内通过本题。

我们不妨以示例一中的字符串 **abcabcbb** 为例，找出从每一个字符开始的，不包含重复字符的最长子串，那么其中最长的那个字符串即为答案。对于示例一中的字符串，我们列举出这些结果，其中括号中表示选中的字符以及最长的字符串：

* 以 (a)bcabcbb 开始的最长字符串为 (abc)abcbb；
* 以 a(b)cabcbb 开始的最长字符串为 a(bca)bcbb；
* 以 ab(c)abcbb 开始的最长字符串为 ab(cab)cbb；
* 以 abc(a)bcbb 开始的最长字符串为 abc(abc)bb；
* 以 abca(b)cbb 开始的最长字符串为 abca(bc)bb；
* 以 abcab(c)bb 开始的最长字符串为 abcab(cb)b；
* 以 abcabc(b)b 开始的最长字符串为 abcabc(b)b；
* 以 abcabcb(b) 开始的最长字符串为 abcabcb(b)。

发现了什么？如果我们依次递增地枚举子串的起始位置，那么子串的结束位置也是递增的！这里的原因在于，假设我们选择字符串中的第 k 个字符作为起始位置，并且得到了不包含重复字符的最长子串的结束位置为 rk。那么当我们选择第 k+1 个字符作为起始位置时，首先从 k+1 到 rk的字符显然是不重复的，并且由于少了原本的第 k 个字符，我们可以尝试继续增大 rk，直到右侧出现了重复字符为止。

这样一来，我们就可以使用「滑动窗口」来解决这个问题了：

* 我们使用两个指针表示字符串中的某个子串（或窗口）的左右边界，其中左指针代表着上文中「枚举子串的起始位置」，而右指针即为上文中的 rk；

* 在每一步的操作中，我们会将左指针向右移动一格，表示 我们开始枚举下一个字符作为起始位置，然后我们可以不断地向右移动右指针，但需要保证这两个指针对应的子串中没有重复的字符。在移动结束后，这个子串就对应着 以左指针开始的，不包含重复字符的最长子串。我们记录下这个子串的长度；

* 在枚举结束后，我们找到的最长的子串的长度即为答案。

**判断重复字符**

在上面的流程中，我们还需要使用一种数据结构来判断 是否有重复的字符，常用的数据结构为哈希集合（即 C++ 中的 std::unordered_set，Java 中的 HashSet，Python 中的 set, JavaScript 中的 Set）。在左指针向右移动的时候，我们从哈希集合中移除一个字符，在右指针向右移动的时候，我们往哈希集合中添加一个字符。

至此，我们就完美解决了本题。

**复杂度分析**

时间复杂度：O(N)，其中 N 是字符串的长度。左指针和右指针分别会遍历整个字符串一次。

空间复杂度：O(∣Σ∣)，其中 Σ 表示字符集（即字符串中可以出现的字符），∣Σ∣ 表示字符集的大小。在本题中没有明确说明字符集，因此可以默认为所有 ASCII 码在 [0, 128)[0,128) 内的字符，即 ∣Σ∣=128。我们需要用到哈希集合来存储出现过的字符，而字符最多有 ∣Σ∣ 个，因此空间复杂度为 O(∣Σ∣)。

**题解**
```JavaScript
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};
```

```
执行用时：76 ms
内存消耗：45.6 MB
```

### 4. 寻找两个正序数组的中位数
给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。

算法的时间复杂度应该为 O(log (m+n)) 。

**示例 1：**

```
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
```

**示例 2：**

```
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

**提示：**

* nums1.length == m
* nums2.length == n
* 0 <= m <= 1000
* 0 <= n <= 1000
* 1 <= m + n <= 2000
* -106 <= nums1[i], nums2[i] <= 106

**题解**

方法1.二分查找
* 思路：数组合并之后在排序的复杂度是O((m+n) log(m+n))不符合题意，题目要求的是O(log (m+n))，我们一看到logn的复杂度就联想到了二分。二分长度较小的数组，找到这个数组二分的位置，在根据这个二分的位置和两个数组的总长度找到另一个数组二分的位置，比较这两个位置的四个数是否满足交叉小于等于，不满足继续二分，满足就找到了解
* 复杂度：时间复杂度O(log( min(m，n)) )，m、n分别是nums1和nums2的长度。每次二分循环的长度都会少一半，只要二分比较短的数组即可。空间复杂度O(1)

```JavaScript
var findMedianSortedArrays = (nums1, nums2) => {
    let len1 = nums1.length, len2 = nums2.length
    if (len1 > len2) return findMedianSortedArrays(nums2, nums1)//对nums1和nums2中长度较小的二分
    let len = len1 + len2//总长 6 + 6 = 12    6 + 7 = 13
    let start = 0, end = len1 //进行二分的开始和结束位置 0 6     0  6
    let partLen1, partLen2

    while (start <= end) {
        // 偶数n右移1位 是 n/2 ,  奇数n右移1位 是n/2向下取整的数
        partLen1 = (start + end) >> 1 // nums1二分的位置 3   3 
        partLen2 = ((len + 1) >> 1) - partLen1 // nums2二分的位置 3  4

        //L1:nums1二分之后左边的位置，L2，nums1二分之后右边的位置 0 1 2 | 3 4 5 
        //R1:nums2二分之后左边的位置，R2，nums2二分之后右边的位置 0 1 2 | 3 4 5 

        // 0 1 2 | 3 4 5 
        // 1 2 2 3 4 5 6 7 8 9 10 11
        // 1 2 3 | 4 (5 6)       6位
        // (2 7) 8 | 9 10 11     6位
        // 0 1 2 | 3 4 5 

        // 0 1 2 | 3 4 5 
        // 1 2 3 4 6 7 9 16 17 20 25 28 29

        // 1 3 (6 | 9) 20 25           6 位
        // 2 4 (7 | 16) 17 28 29       7 位
        
        // 0 1 2 3 | 4 5 6
        //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums1二分的位置左边一个
        let L1 = partLen1 === 0 ? -Infinity : nums1[partLen1 - 1]
        //如果左边没字符了，就定义成-Infinity，让所有数都大于它，否则就是nums2二分的位置左边一个
        let L2 = partLen2 === 0 ? -Infinity : nums2[partLen2 - 1]
        //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
        let R1 = partLen1 === len1 ? Infinity : nums1[partLen1]
        //如果右边没字符了，就定义成Infinity，让所有数都小于它，否则就是nums1二分的位置
        let R2 = partLen2 === len2 ? Infinity : nums2[partLen2]

        if (L1 > R2) {//不符合交叉小于等于 继续二分
            end = partLen1 - 1
        } else if (L2 > R1) {//不符合交叉小于等于 继续二分
            start = partLen1 + 1
        } else { // L1 <= R2 && L2 <= R1 符合交叉小于等于
            return len % 2 === 0 ?
                (Math.max(L1, L2) + Math.min(R1, R2)) / 2 : //长度为偶数返回作左侧较大者 和 右边较小者和 的一半
                Math.max(L1, L2)	//长度为奇数返回作左侧较大者
        }
    }
}
```

```
执行用时：112 ms
内存消耗：45.2 MB
```

### 5. 最长回文子串

给你一个字符串 s，找到 s 中最长的回文子串。

**示例 1：**

```
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```
**示例 2：**

```
输入：s = "cbbd"
输出："bb"
```

**提示：**

* 1 <= s.length <= 1000
* s 仅由数字和英文字母组成

**题解**

```JavaScript
var longestPalindrome = (s) => {
    if (s == null || s.length < 1) {
        return "";
    }
    let start = 0, end = 0;
    for (let i = 0; i < s.length; i++) {
        let len1 = expandAroundCenter(s, i, i);     // 寻找1个字母为中心的对称数
        let len2 = expandAroundCenter(s, i, i + 1); // 寻找2个字母为中心，中间两个字母相同，左右对称的数
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
```

**测试**
```JavaScript
console.log(longestPalindrome('aaa'));   // aaa
console.log(longestPalindrome('aaaa'));  // aaaa
console.log(longestPalindrome('cbbd'));  // bb
console.log(longestPalindrome('babad'));    // bab
console.log(longestPalindrome('beabaed'));  // eabae
```

```
执行用时: 72 ms
内存消耗: 44.9 MB
```

### 6. Z 字形变换

将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

```
P   A   H   N
A P L S I I G
Y   I   R
```

之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

```
string convert(string s, int numRows);
```

**示例 1：**

```
输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
```

**示例 2：**

```
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
```

**示例 3：**

```
输入：s = "A", numRows = 1
输出："A"
```

**提示：**

* 1 <= s.length <= 1000
* s 由英文字母（小写和大写）、',' 和 '.' 组成
* 1 <= numRows <= 1000

**题解**

```JavaScript
/**
 * @param {string} s 字符串
 * @param {number} numRows 行数
 * @return {string}
 */
var convert = function(s, numRows) {
    if(numRows == 1)
        return s;

    const len = Math.min(s.length, numRows);
    const rows = [];
    for(let i = 0; i< len; i++) rows[i] = "";
    let loc = 0;
    let down = false;

    for(const c of s) {
        rows[loc] += c;
        if(loc == 0 || loc == numRows - 1)  // 第0行 和 最后一行，是否继续向下down 要翻转
            down = !down; // 拐点翻转
        loc += down ? 1 : -1; // 根据down箭头方向，得出 loc++  还是 loc--
    }

    let ans = "";
    for(const row of rows) {
        ans += row;
    }
    return ans;
};
```

```
执行用时: 60 ms
内存消耗: 45.4 MB
```

### 7. 整数反转

给你一个 32 位的有符号整数 x ，返回将 x 中的数字部分反转后的结果。

如果反转后整数超过 32 位的有符号整数的范围 [−2<sup>31</sup>,  2<sup>31</sup> − 1] ，就返回 0。

假设环境不允许存储 64 位整数（有符号或无符号）。


**示例 1：**

```
输入：x = 123
输出：321
```

**示例 2：**

```
输入：x = -123
输出：-321
```

**示例 3：**

```
输入：x = 120
输出：21
```

**示例 4：**

```
输入：x = 0
输出：0
```

**提示：**
-2<sup>31</sup> <= x <= 2<sup>31</sup> - 1


**题解**

```JavaScript
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
        const digit = x % 10;
        x = ~~(x / 10); // 相当于 Number
        rev = rev * 10 + digit;
        if (rev < Math.pow(-2, 31) || rev > Math.pow(2, 31) - 1) {
            return 0;
        }
    }
    return rev;
};

console.log(reverse(-123));
console.log(reverse2(-324));
```

```
执行用时: 68 ms
内存消耗: 42.9 MB
```



### 8. 字符串转换整数 (atoi)

请你来实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数（类似 C/C++ 中的 atoi 函数）。


函数 myAtoi(string s) 的算法如下：

* 1.读入字符串并丢弃无用的前导空格
* 2.检查下一个字符（假设还未到字符末尾）为正还是负号，读取该字符（如果有）。 确定最终结果是负数还是正数。 如果两者都不存在，则假定结果为正。
* 3.读入下一个字符，直到到达下一个非数字字符或到达输入的结尾。字符串的其余部分将被忽略。
* 4.将前面步骤读入的这些数字转换为整数（即，"123" -> 123， "0032" -> 32）。如果没有读入数字，则整数为 0 。必要时更改符号（从步骤 2 开始）。
* 5.如果整数数超过 32 位有符号整数范围 [−2<sup>31</sup>,  2<sup>31</sup> − 1] ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −2<sup>31</sup> 的整数应该被固定为 −2<sup>31</sup> ，大于 2<sup>31</sup> − 1 的整数应该被固定为 2<sup>31</sup> − 1 。
* 6.返回整数作为最终结果。

注意：

* 本题中的空白字符只包括空格字符 ' ' 。
* 除前导空格或数字后的其余字符串外，**请勿忽略** 任何其他字符。

**示例 1：**

```
输入：s = "42"
输出：42
解释：加粗的字符串为已经读入的字符，插入符号是当前读取的字符。
第 1 步："42"（当前没有读入字符，因为没有前导空格）
         ^
第 2 步："42"（当前没有读入字符，因为这里不存在 '-' 或者 '+'）
         ^
第 3 步："42"（读入 "42"）
           ^
解析得到整数 42 。
由于 "42" 在范围 [-231, 231 - 1] 内，最终结果为 42 。
```

**示例 2：**

```
输入：s = "   -42"
输出：-42
解释：
第 1 步："   -42"（读入前导空格，但忽视掉）
            ^
第 2 步："   -42"（读入 '-' 字符，所以结果应该是负数）
             ^
第 3 步："   -42"（读入 "42"）
               ^
解析得到整数 -42 。
由于 "-42" 在范围 [-231, 231 - 1] 内，最终结果为 -42 。
```

**示例 3：**

```
输入：s = "4193 with words"
输出：4193
解释：
第 1 步："4193 with words"（当前没有读入字符，因为没有前导空格）
         ^
第 2 步："4193 with words"（当前没有读入字符，因为这里不存在 '-' 或者 '+'）
         ^
第 3 步："4193 with words"（读入 "4193"；由于下一个字符不是一个数字，所以读入停止）
             ^
解析得到整数 4193 。
由于 "4193" 在范围 [-231, 231 - 1] 内，最终结果为 4193 。
```

**提示：**

* 0 <= s.length <= 200
* s 由英文字母（大写和小写）、数字（0-9）、' '、'+'、'-' 和 '.' 组成


**题解**

**前言**
关于这道题，之前利用了parseInt()这一API来巧妙解题，有兴趣的同学可以移步这里查看思路。

当作者阅读官方题解时，发现了“自动机”这一解题思路，阅读后欣喜若狂，感觉打开了知识的大门。

激动之余，特地写下这篇题解，以便加深对“自动机”理念的理解，也供有兴趣的小伙伴一起学习。

为了防止日后遗忘，本篇题解会异常详尽，故篇幅可能有些冗长，不过如果你耐心阅读，相信一定会物有所值。

**题意分析**
无论你事先有没有阅读过官方题解，这里统一从头分析一遍。

何谓“自动机”？这里引用LeetCode官方的解释：

我们的程序在每个时刻有一个状态s，每次从序列中输入一个字符c，并根据字符c 转移到下一个状态s'。这样，我们只需要建立一个覆盖所有情况的从s与c映射到s'的表格即可解决题目中的问题。

链接：https://leetcode-cn.com/problems/string-to-integer-atoi/solution/zi-fu-chuan-zhuan-huan-zheng-shu-atoi-by-leetcode-/

是不是觉得这句话有点拗口？没关系，我会用更加通俗易懂的语言来为你讲解一遍。

**状态分析**
首先，从题意中，我们很轻易地可以知道，字符串str中的每个字符，都有可能是以下的四种类型中的一种：

* 空格字符' '（Space）
* 正负号+和-(Sign)
* 字符串型的数值（Number）
* 除以上三种情况外的任何情况（Other）

**阶段分析**
如果想要将字符串转换为整数，那么必然会经历这四个有序的阶段：

* 1.开始转换（start）
* 2.判断正负（signed）
* 3.生成数值（in_number）
* 4.结束转换（end）

**生成自动机**
这步是最为关键的一步，它将状态和阶段巧妙地结合了起来。

话不多说，让我们先来看一个表格：

|        | ' ' (space) |  +/- (Sign)  | Number | Other |
|  ----  | ----  | ----  | ----  | ----  |
| start  | start | signed | in_number | end |
| signed | end | end | in_number | end |
| in_number | end | end | in_number | end |
| end  | end | end | end | end |

现在来说明下这个表格的含义。

不同的行象征不同执行阶段：

* 第0行：开始转换阶段
* 第1行：判断正负阶段
* 第2行：生成数值阶段
* 第3行：结束转换阶段

不同的列象征不同的字符类型：

* 第0列：字符为空格
* 第1列：字符为正、负号
* 第2列：字符为字符型数值
* 第3列：字符为其他形式

由行、列确定的坐标，象征着下一个字符所处的执行阶段。


```JavaScript
// 解法1
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    const number = parseInt(str, 10);

    if(isNaN(number)) {
        return 0;
    } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
        return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
    } else {
        return number;
    }
};


// 解法2
/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
  // 自动机类
  class Automaton{
    constructor() {
      // 执行阶段，默认处于开始执行阶段
      this.state = 'start';
      // 正负符号，默认是正数
      this.sign = 1;
      // 数值，默认是0
      this.answer = 0;
      /*
      关键点：
      状态和执行阶段的对应表
      含义如下：
      [执行阶段, [空格, 正负, 数值, 其他]]
      */
      this.map = new Map([
        ['start', ['start', 'signed', 'in_number', 'end']],
        ['signed', ['end', 'end', 'in_number', 'end']],
        ['in_number', ['end', 'end', 'in_number', 'end']],
        ['end', ['end', 'end', 'end', 'end']]
      ])
    }

    // 获取状态的索引
    getIndex(char) {
      if (char === ' ') {
        // 空格判断
        return 0;
      } else if (char === '-' || char === '+') {
        // 正负判断
        return 1;
      } else if (typeof Number(char) === 'number' && !isNaN(char)) {
        // 数值判断
        return 2;
      } else {
        // 其他情况
        return 3;
      }
    }

    /*
    关键点：
    字符转换执行函数
    */
    get(char) {
      /*
      易错点：
      每次传入字符时，都要变更自动机的执行阶段
      */
      this.state = this.map.get(this.state)[this.getIndex(char)];

      if(this.state === 'in_number') {
        /*
        小技巧：
        在JS中，对字符串类型进行减法操作，可以将得到一个数值型（Number）的值

        易错点：
        本处需要利用括号来提高四则运算的优先级
        */
        this.answer = this.answer * 10 + (char - 0);

        /*
        易错点：
        在进行负数比较时，需要将INT_MIN变为正数
        */
        this.answer = this.sign === 1 ? Math.min(this.answer, Math.pow(2, 31) - 1) : Math.min(this.answer, -Math.pow(-2, 31));
      } else if (this.state === 'signed') {
        /*
        优化点：
        对于一个整数来说，非正即负，
        所以正负号的判断，只需要一次。
        故，可以降低其判断的优先级
        */
        this.sign = char === '+' ? 1 : -1;
      }
    }
  }

  // 生成自动机实例
  let automaton = new Automaton();

  // 遍历每个字符
  for(let char of str) {
    // 依次进行转换
    automaton.get(char);
  }

  // 返回值，整数 = 正负 * 数值
  return automaton.sign * automaton.answer;
};
```

```
执行用时: 88 ms
内存消耗: 45.6 MB
```

### 9. 回文数

给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

* 例如，121 是回文，而 123 不是。
 


**示例 1：**

```
输入：x = 121
输出：true
```

**示例 2：**

```
输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
```

**示例 3：**

```
输入：x = 10
输出：false
解释：从右向左读, 为 01 。因此它不是一个回文数。
```


提示：

* -2<sup>31</sup> <= x <= 2<sup>31</sup> - 1

**进阶：** 你能不将整数转为字符串来解决这个问题吗？


**题解**

```JavaScript
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
            cur = cur * 10 + num % 10; // 获取余数
            num = Math.floor(num/10); // 获取除数
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
```

```
执行用时: 116 ms
内存消耗: 48.8 MB
```
***

### 11. 盛最多水的容器

给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。


**说明：**你不能倾斜容器。

**示例 1：**

![示例图](./image/11.%20%E7%9B%9B%E6%9C%80%E5%A4%9A%E6%B0%B4%E7%9A%84%E5%AE%B9%E5%99%A8.png '11. 盛最多水的容器')

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**示例 2：**

```
输入：height = [1,1]
输出：1
```

**提示：**

* n == height.length
* 2 <= n <= 105
* 0 <= height[i] <= 104

**题解**

方法一：双指针
说明

本题是一道经典的面试题，最优的做法是使用「双指针」。如果读者第一次看到这题，不一定能想出双指针的做法。

分析

我们先从题目中的示例开始，一步一步地解释双指针算法的过程。稍后再给出算法正确性的证明。

题目中的示例为：

```
[1, 8, 6, 2, 5, 4, 8, 3, 7]
 ^                       ^
```
在初始时，左右指针分别指向数组的左右两端，它们可以容纳的水量为 min(1,7)∗8=8。

此时我们需要移动一个指针。移动哪一个呢？直觉告诉我们，应该移动对应数字较小的那个指针（即此时的左指针）。这是因为，由于容纳的水量是由

两个指针指向的数字中较小值 * 指针之间的距离

决定的。如果我们移动数字较大的那个指针，那么前者「两个指针指向的数字中较小值」不会增加，后者「指针之间的距离」会减小，那么这个乘积会减小。因此，我们移动数字较大的那个指针是不合理的。因此，我们移动 数字较小的那个指针。

有读者可能会产生疑问：我们可不可以同时移动两个指针？ 先别急，我们先假设 总是移动数字较小的那个指针 的思路是正确的，在走完流程之后，我们再去进行证明。

所以，我们将左指针向右移动：

```
[1, 8, 6, 2, 5, 4, 8, 3, 7]
    ^                    ^
```
此时可以容纳的水量为 \min(8, 7) * 7 = 49min(8,7)∗7=49。由于右指针对应的数字较小，我们移动右指针：
```
[1, 8, 6, 2, 5, 4, 8, 3, 7]
    ^                 ^
```
此时可以容纳的水量为 \min(8, 3) * 6 = 18min(8,3)∗6=18。由于右指针对应的数字较小，我们移动右指针：
```
[1, 8, 6, 2, 5, 4, 8, 3, 7]
    ^              ^
```
此时可以容纳的水量为 \min(8, 8) * 5 = 40min(8,8)∗5=40。两指针对应的数字相同，我们可以任意移动一个，例如左指针：
```
[1, 8, 6, 2, 5, 4, 8, 3, 7]
       ^           ^
```
此时可以容纳的水量为 \min(6, 8) * 4 = 24min(6,8)∗4=24。由于左指针对应的数字较小，我们移动左指针，并且可以发现，在这之后左指针对应的数字总是较小，因此我们会一直移动左指针，直到两个指针重合。在这期间，对应的可以容纳的水量为：min(2,8)∗3=6，min(5,8)∗2=10，min(4,8)∗1=4。

在我们移动指针的过程中，计算到的最多可以容纳的数量为 4949，即为最终的答案。

下面的动画也给出了这个示例的过程：略


证明

为什么双指针的做法是正确的？

> 双指针代表了什么？

双指针代表的是 **可以作为容器边界的所有位置的范围。**在一开始，双指针指向数组的左右边界，表示 **数组中所有的位置都可以作为容器的边界，**因为我们还没有进行过任何尝试。在这之后，我们每次将 **对应的数字较小的那个指针** 往 **另一个指针** 的方向移动一个位置，就表示我们认为 **这个指针不可能再作为容器的边界了。**

> 为什么对应的数字较小的那个指针不可能再作为容器的边界了？

在上面的分析部分，我们对这个问题有了一点初步的想法。这里我们定量地进行证明。

考虑第一步，假设当前左指针和右指针指向的数分别为 x 和 y，不失一般性，我们假设 x ≤ y。同时，两个指针之间的距离为 t。那么，它们组成的容器的容量为：

```
min(x,y)∗t=x∗t
```

我们可以断定，**如果我们保持左指针的位置不变，那么无论右指针在哪里，这个容器的容量都不会超过 x∗t 了。**注意这里右指针只能向左移动，因为 **我们考虑的是第一步，**也就是** 指针还指向数组的左右边界的时候。**

我们任意向左移动右指针，指向的数为 y<sub>1</sub>，两个指针之间的距离为 t<sub>1</sub>，那么显然有 t<sub>1</sub> < t ，并且 min(x,y<sub>1</sub>) ≤ min(x,y)：

* 如果 y<sub>1</sub> ≤ y，那么 min(x,y<sub>1</sub>) ≤ min(x,y)；
* 如果 y<sub>1</sub> > y，那么 min(x,y<sub>1</sub>) = x = min(x,y)；

因此有：


min(x,y<sub>t</sub>)∗t<sub>1</sub> < min(x,y)∗t


即无论我们怎么移动右指针，得到的容器的容量都小于移动前容器的容量。也就是说，**这个左指针对应的数不会作为容器的边界了，**那么我们就可以丢弃这个位置，**将左指针向右移动一个位置，**此时新的左指针于原先的右指针之间的左右位置，才可能会作为容器的边界。

这样以来，我们将问题的规模减小了 1，被我们丢弃的那个位置就相当于消失了。**此时的左右指针，就指向了一个新的、规模减少了的问题的数组的左右边界，**因此，我们可以继续像之前 考虑第一步 那样考虑这个问题：

* 求出当前双指针对应的容器的容量；

* 对应数字较小的那个指针以后不可能作为容器的边界了，将其丢弃，并移动对应的指针。

> 最后的答案是什么？

答案就是我们每次以双指针为左右边界（也就是「数组」的左右边界）计算出的容量中的最大值。


```JavaScript
var maxArea = (height) => {
    var l = 0, r = height.length - 1;
    var ans = 0;
    while (l < r) {
        var area = Math.min(height[l], height[r]) * (r - l);  // min(x, y) ∗ t = x∗t
        ans = Math.max(ans, area);
        if (height[l] <= height[r]) { // x <= y
            ++l;
        }else { // x > y
            --r;
        }
    }
    return ans;
}
```

```
执行用时: 68 ms
内存消耗: 48.1 MB
```

***


### 12. 整数转罗马数字
罗马数字包含以下七种字符： I， V， X， L，C，D 和 M。

```
字符          数值
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

```
例如， 罗马数字 2 写做 II ，即为两个并列的 1。12 写做 XII ，即为 X + II 。 27 写做  XXVII, 即为 XX + V + II 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：

* I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
* X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。 
* C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。

给你一个整数，将其转为罗马数字。



**示例 1：**

```
输入: num = 3
输出: "III"
```

**示例 2：**

```
输入: num = 4
输出: "IV"
```

**示例 3：**

```
输入: num = 9
输出: "IX"
```

**示例 4：**

```
输入: num = 58
输出: "LVIII"
解释: L = 50, V = 5, III = 3.
```

**示例 5：**

```
输入: num = 1994
输出: "MCMXCIV"
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

**提示：**

* 1 <= num <= 3999


**题解**

思路一：贪心
贪心法则：我们每次尽量使用最大的数来表示。 比如对于 1994 这个数，如果我们每次尽量用最大的数来表示，依次选 1000，900，90，4，会得到正确结果 MCMXCIV。

所以，我们将哈希表按照从大到小的顺序排列，然后遍历哈希表，直到表示完整个输入。

![12. 整数转罗马数字](./image/12.%20%E6%95%B4%E6%95%B0%E8%BD%AC%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97.png '12.整数转罗马数字')

```JavaScript
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    var hashmap = {'1000':'M', '900':'CM', '500':'D', '400':'CD', '100':'C', '90':'XC', '50':'L', '40':'XL', '10':'X', '9':'IX', '5':'V', '4':'IV', '1':'I'}
    
    var res = '';
    var hashmapKeys = Object.keys(hashmap).reverse();
    for (const key of hashmapKeys) {
        if (num / key != 0) {
            count = Math.floor(num / key)  // 比如输入4000，count 为 4
            res += strFun(hashmap[key], count) // hashmap[key] * count
            num %= key
        }
    }
    return res
};
// 类似python的 字符串*数字 得到重复字符串
var strFun = function(str, num) {
    var arr = [];
    for (let index = 0; index < num; index++) {
        arr.push(str);
    }
    return arr.join('');
}
```
```
执行用时: 104 ms
内存消耗: 48.5 MB
```
***


### 



**示例 1：**

```
```

**示例 2：**

```
```

**示例 3：**

```
```

**示例 4：**

```
```



**题解**

```JavaScript

```

```

```
***

### 



**示例 1：**

```
```

**示例 2：**

```
```

**示例 3：**

```
```

**示例 4：**

```
```



**题解**

```JavaScript

```

```

```
***

### 



**示例 1：**

```
```

**示例 2：**

```
```

**示例 3：**

```
```

**示例 4：**

```
```



**题解**

```JavaScript

```

```

```
***

### 



**示例 1：**

```
```

**示例 2：**

```
```

**示例 3：**

```
```

**示例 4：**

```
```



**题解**

```JavaScript

```

```

```
***