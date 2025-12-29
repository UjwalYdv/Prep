<div align = "center">
<h style = "margin-bottom: 0px; margin-top: 0px; color : purple;" align = "center" class = "header">

## ⌨ 854. Making A Large Island

</h>
</div>

<h2><a href="https://leetcode.com/problems/making-a-large-island" target = "_blank">854. Making A Large Island</a></h2><h3>Hard</h3><hr><p>You are given an <code>n x n</code> binary matrix <code>grid</code>. You are allowed to change <strong>at most one</strong> <code>0</code> to be <code>1</code>.</p>

<p>Return <em>the size of the largest <strong>island</strong> in</em> <code>grid</code> <em>after applying this operation</em>.</p>

<p>An <strong>island</strong> is a 4-directionally connected group of <code>1</code>s.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> grid = [[1,0],[0,1]]
<strong>Output:</strong> 3
<strong>Explanation:</strong> Change one 0 to 1 and connect two 1s, then we get an island with area = 3.
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> grid = [[1,1],[1,0]]
<strong>Output:</strong> 4
<strong>Explanation: </strong>Change the 0 to 1 and make the island bigger, only one island with area = 4.</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> grid = [[1,1],[1,1]]
<strong>Output:</strong> 4
<strong>Explanation:</strong> Can&#39;t change any 0 to 1, only one island with area = 4.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == grid.length</code></li>
	<li><code>n == grid[i].length</code></li>
	<li><code>1 &lt;= n &lt;= 500</code></li>
	<li><code>grid[i][j]</code> is either <code>0</code> or <code>1</code>.</li>
</ul>

<CodeTabs :languages="[ { name: 'C++', slot: 'cpp' }, { name: 'Java', slot: 'java' } ]"> <template #java>

```java
class Solution {
    static class Pair {
        int row;
        int col;
        public Pair(int row, int col) {
            this.row = row;
            this.col = col;
        }
        @Override
        public String toString() {
            return "(" + row + " " + col + ")";
        }
    }
    static class DSU {
        private int parent[];
        private int size[];
        public DSU(int n) {
            parent = new int[n + 1];
            size = new int[n + 1];
            for (int i = 0; i <= n; i++) {
                parent[i] = i;
                size[i] = 1;
            }
        }
        public int Leader(int u) {
            if (parent[u] == u)
                return parent[u];
            return parent[u] = Leader(parent[u]);
        }
        public void unite(int u, int v) {
            u = Leader(u);
            v = Leader(v);
            if (u == v)
                return;
            if (size[v] > size[u]) {
                int temp = u;
                u = v;
                v = temp;
            }
            parent[v] = u;
            size[u] += size[v];
        }
    }
    public int largestIsland(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        DSU dsu = new DSU(n * m + 1);
        int vis[][] = new int[n + 1][m + 1];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (vis[i][j] == 0 && grid[i][j] == 1)
                    BFS(i, j, vis, grid, dsu);
            }
        }
        int maxi = 0;
        for (int i = 0; i <= n * m; i++)
            maxi = Math.max(maxi, dsu.size[dsu.Leader(i)]);
        int dir[][] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 0) {
                    HashSet<Integer> ids = new HashSet<>();
                    for (int dire[] : dir) {
                        int nr = i + dire[0];
                        int nc = j + dire[1];
                        if (nr < n && nc < m && nr >= 0 && nc >= 0 && grid[nr][nc] == 1) {
                            int id = nr * m + nc;
                            ids.add(dsu.Leader(id));
                        }
                    }
                    int sum = 0;
                    for (int ele : ids)
                        sum += dsu.size[ele];
                    sum++;
                    maxi = Math.max(maxi, sum);
                }
            }
        }
        return maxi;
    }
    private void BFS(int row, int col, int vis[][], int grid[][], DSU dsu) {
        int n = grid.length;
        int m = grid[0].length;
        int dir[][] = {{-1, 0}, {1, 0}, {0, 1}, {0, -1}};
        Queue<Pair> q = new LinkedList<>();
        q.offer(new Pair(row, col));
        vis[row][col] = 1;
        while (q.size() > 0) {
            int cr = q.peek().row;
            int cc = q.peek().col;
            int current_id = cr * m + cc;
            q.poll();
            for (int dire[] : dir) {
                int nr = cr + dire[0];
                int nc = cc + dire[1];
                int new_id = nr * m + nc;
                if (nr < n && nc < m && nr >= 0 && nc >= 0 && vis[nr][nc] == 0 && grid[nr][nc] == 1) {
                    vis[nr][nc] = 1;
                    q.offer(new Pair(nr, nc));
                    dsu.unite(current_id, new_id);
                }
            }
        }
    }
}
```

</template>

<template #cpp>

```cpp
class Solution {
public:
    int dfs(int row , int col , vector<vector<int>>& grid , int id){
        int n = grid.size();
        if(row < 0 || row >= n || col < 0 || col >= n || grid[row][col] != 1){
            return 0;
        }
        grid[row][col] = id;
        int delrow[] = {0 , 1 , 0 , -1};
        int delcol[] = {1 , 0 , -1 , 0};
        int size = 1;
        for(int i = 0 ; i < 4 ; i++){
            int nrow = delrow[i] + row;
            int ncol = delcol[i] + col;

            size += dfs(nrow , ncol , grid , id);
        }
        return size;
    }
    int largestIsland(vector<vector<int>>& grid) {
        int n = grid.size();
        map<int, int> mpp; // id no of island -> size of island
        int id = 2;
        int maxi = 0;
        for(int i = 0 ; i < n ; i++){
            for(int j = 0 ; j < n ; j++){
                if(grid[i][j] == 1){
                    int size = dfs(i , j , grid , id);
                    maxi = max(maxi , size);
                    mpp[id] = size;
                    id++;
                }
            }
        }
        for(int i = 0 ; i < n; i++){
            for(int j = 0 ; j < n ; j++){
                if(grid[i][j] == 0){ // ask the ngbrs about their max size and add 1 to it
                    set<int> st;
                    int delrow[] = {0 , 1 , 0 , -1};
                    int delcol[] = {1 , 0 , -1 , 0};
                    for(int x = 0 ; x < 4 ; x++){
                        int i_ = i + delrow[x];
                        int j_ = j + delcol[x];
                        if(i_ >= 0 && i_ < n && j_ >= 0 && j_ < n &&
                        grid[i_][j_] != 0) st.insert(grid[i_][j_]);
                    }
                    int currSize = 1;
                    for(auto id : st){
                        currSize += mpp[id];
                    }
                    maxi = max(maxi , currSize);
                }
            }
        }
        return maxi;
    }
};
```

</template>

</CodeTabs>
