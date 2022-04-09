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

findMedianSortedArrays([1, 3, 6, 9, 20, 25 ], [2, 4, 7, 16, 17, 28, 29 ])