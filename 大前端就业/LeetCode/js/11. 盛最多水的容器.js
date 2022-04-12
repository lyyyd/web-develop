var maxArea = (height) => {
    var l = 0, r = height.length - 1;
    var ans = 0;
    while (l < r) {
        var area = Math.min(height[l], height[r]) * (r - l);
        ans = Math.max(ans, area);
        if (height[l] <= height[r]) {
            ++l;
        }
        else {
            --r;
        }
    }
    return ans;
}

console.log(maxArea([1,8,6,2,5,4,8,3,7]))