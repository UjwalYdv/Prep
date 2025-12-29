<div align = "center">
<h style = "margin-bottom: 0px; margin-top: 0px; color : purple;" align = "center" class = "header">

## ⌨ 925. Construct Binary Tree from Preorder and Postorder Traversal

</h>
</div>

<h2><a href="https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal" target = "_blank">925. Construct Binary Tree from Preorder and Postorder Traversal</a></h2><h3>Medium</h3><hr><p>Given two integer arrays, <code>preorder</code> and <code>postorder</code> where <code>preorder</code> is the preorder traversal of a binary tree of <strong>distinct</strong> values and <code>postorder</code> is the postorder traversal of the same tree, reconstruct and return <em>the binary tree</em>.</p>

<p>If there exist multiple answers, you can <strong>return any</strong> of them.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/24/lc-prepost.jpg" style="width: 304px; height: 265px;" />
<pre>
<strong>Input:</strong> preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
<strong>Output:</strong> [1,2,3,4,5,6,7]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> preorder = [1], postorder = [1]
<strong>Output:</strong> [1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= preorder.length &lt;= 30</code></li>
	<li><code>1 &lt;= preorder[i] &lt;= preorder.length</code></li>
	<li>All the values of <code>preorder</code> are <strong>unique</strong>.</li>
	<li><code>postorder.length == preorder.length</code></li>
	<li><code>1 &lt;= postorder[i] &lt;= postorder.length</code></li>
	<li>All the values of <code>postorder</code> are <strong>unique</strong>.</li>
	<li>It is guaranteed that <code>preorder</code> and <code>postorder</code> are the preorder traversal and postorder traversal of the same binary tree.</li>
</ul>

<CodeTabs :languages="[ { name: 'C++', slot: 'cpp' }, { name: 'Java', slot: 'java' } ]"> <template #java>

```java
class Solution {
    public TreeNode constructFromPrePost(int[] pre, int[] post) {
        Map<Integer, Integer> postToIndex = new HashMap<>();
        for (int i = 0; i < post.length; ++i)
            postToIndex.put(post[i], i);
        return build(pre, 0, pre.length - 1, post, 0, post.length - 1, postToIndex);
    }

    private TreeNode build(int[] pre, int preStart, int preEnd, int[] post, int postStart, int postEnd, Map<Integer, Integer>postToIndex) {
        if (preStart > preEnd)
            return null;
        if (preStart == preEnd)
            return new TreeNode(pre[preStart]);
        final int rootVal = pre[preStart];
        final int leftRootVal = pre[preStart + 1];
        final int leftRootPostIndex = postToIndex.get(leftRootVal);
        final int leftSize = leftRootPostIndex - postStart + 1;
        TreeNode root = new TreeNode(rootVal);
        root.left = build(pre, preStart + 1, preStart + leftSize, post, postStart, leftRootPostIndex,
                          postToIndex);
        root.right = build(pre, preStart + leftSize + 1, preEnd, post, leftRootPostIndex + 1,
                           postEnd - 1, postToIndex);
        return root;
    }
}
```

</template>

<template #cpp>

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
private:
    TreeNode* solve(int prestart, int poststart, int preend, vector<int>& preorder, vector<int>& postorder,
    unordered_map<int,int>& mpp){
        if(prestart > preend) return NULL;
        TreeNode* root = new TreeNode(preorder[prestart]);
        if(prestart == preend) return root;
        int nextNode = preorder[prestart + 1];
        int j = mpp[nextNode];
        int num = j - poststart + 1;
        root -> left = solve(prestart + 1, poststart, prestart + num, preorder, postorder, mpp);
        root -> right = solve(prestart + num + 1, j + 1, preend, preorder, postorder, mpp);
        return root;
    }
public:
    TreeNode* constructFromPrePost(vector<int>& preorder, vector<int>& postorder) {
        int n = preorder.size();
        unordered_map<int, int> mpp;
        for(int i = 0; i < n; i++){
            mpp[postorder[i]] = i;
        }
        return solve(0, 0, n - 1, preorder, postorder, mpp);
    }
};
```

</template>

</CodeTabs>
