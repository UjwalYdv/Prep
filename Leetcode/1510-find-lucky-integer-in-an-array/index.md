<div align = "center">
<h style = "margin-bottom: 0px; margin-top: 0px; color : purple;" align = "center" class = "header">

## ⌨ 1510. Find Lucky Integer in an Array

</h>
</div>

<h2><a href="https://leetcode.com/problems/find-lucky-integer-in-an-array" target = "_blank">1510. Find Lucky Integer in an Array</a></h2><h3>Easy</h3><hr><p>Given an array of integers <code>arr</code>, a <strong>lucky integer</strong> is an integer that has a frequency in the array equal to its value.</p>

<p>Return <em>the largest <strong>lucky integer</strong> in the array</em>. If there is no <strong>lucky integer</strong> return <code>-1</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> arr = [2,2,3,4]
<strong>Output:</strong> 2
<strong>Explanation:</strong> The only lucky number in the array is 2 because frequency[2] == 2.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> arr = [1,2,2,3,3,3]
<strong>Output:</strong> 3
<strong>Explanation:</strong> 1, 2 and 3 are all lucky numbers, return the largest of them.
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> arr = [2,2,2,3,3]
<strong>Output:</strong> -1
<strong>Explanation:</strong> There are no lucky numbers in the array.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= arr.length &lt;= 500</code></li>
	<li><code>1 &lt;= arr[i] &lt;= 500</code></li>
</ul>

<CodeTabs :languages="[ { name: 'C++', slot: 'cpp' }, { name: 'Java', slot: 'java' } ]">

<template #java>

```java
class Solution {
    public int findLucky(int[] arr) {
        int n = arr.length;
        int freq[] = new int[501];
        int maxi = -1;
        for (int ele : arr)
            freq[ele]++;
        for (int ele : arr)
            if (freq[ele] == ele)
                maxi = Math.max(maxi, ele);

        return maxi;
    }
}
```

</template>

<template #cpp>

```cpp
class Solution {
public:
    int findLucky(vector<int>& arr) {
        map<int,int> mpp;
        for(auto &it : arr) mpp[it]++;
        int res = -1;
        for(auto it : mpp){
            if(it.first == it.second){
                res = max(res, it.first);
            }
        }
        return res;
    }
};
```

</template>

</CodeTabs>
