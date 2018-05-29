#include <stdio.h>

int a, b, u, v, n, i, j, ne = 1;
int visited[10] = {0}, min, mincost = 0, cost[10][10];

int RandomNumberGenerator(const int nMin,const int nMax){
    return rand()%(nMax-nMin) + nMin;
}

void main()
{   
    n = 5;
    printf("\n the number of nodes: %d", n);    
    
    printf("\n the adjacency matrix:\n");
    for (i = 1; i <= n; i++)
        for (j = 1; j <= n; j++)
        {
            cost[i][j] = RandomNumberGenerator(1,21);
            if (cost[i][j] == 0)
                cost[i][j] = 999;
            printf("%d\n", cost[i][j]);
        }
    
    visited[1] = 1;
    printf("\n");
    
    while (ne < n)
    {
        for (i = 1, min = 999; i <= n; i++)
            for (j = 1; j <= n; j++)
                if (cost[i][j] < min)
                    if (visited[i] != 0)
                    {
                        min = cost[i][j];
                        a = u = i;
                        b = v = j;
                    }
        if (visited[u] == 0 || visited[v] == 0)
        {
            printf("\n Edge %d:(%d %d) cost:%d", ne++, a, b, min);
            mincost += min;
            visited[b] = 1;
        }
        cost[a][b] = cost[b][a] = 999;
    }
    
    printf("\n Minimun cost = %d", mincost);
}