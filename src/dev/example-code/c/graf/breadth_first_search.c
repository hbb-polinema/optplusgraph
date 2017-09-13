#include <stdlib.h>

int a[10][10],
    q[10],
    visited[10],
    n,
    i,
    j,
    f = 0,
    r = -1;

void bfs(int v)
{
    for (i = 1; i <= n; i++){
        if (a[v][i] && !visited[i])
            q[++r] = i;
    }

    if (f <= r)
    {
        visited[q[f]] = 1;
        bfs(q[f++]);
    }
}

int main()
{
    int v;
    
    printf("\n Enter the number of vertices: 7");
    n = 7;

    for (i = 1; i <= n; i++)
    {
        q[i] = 0;
        visited[i] = 0;
    }

    printf("\n Enter graph data in matrix form:\n");
    for (i = 1; i <= n; i++)
        for (j = 1; j <= n; j++)
            a[i][j] = rand();
    
    printf("\n Enter the starting vertex:");
    v = 3;

    bfs(v);
    
    printf("\n The node which are reachable are:\n");
    for (i = 1; i <= n; i++)
        if (visited[i])
            printf("%d\t", i);
        else
            printf("\n Bfs is not possible");
    
    return 0;
}
