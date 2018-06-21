/*
* Dijsktra (undirected weight graph)
* instant value
**/

#include<stdio.h>
#define infinity 999

void dij(int n, int v, int cost[7][7], int dist[10])
{
    int i, u, count, w, flag[10], min;

    for (i = 1; i <= n; i++){
        flag[i] = 0;
        dist[i] = cost[v][i];
    }
    
    count = 2;
    
    while (count <= n){
        min = 99;
        for (w = 1; w <= n; w++){
            if (dist[w] < min && !flag[w]){
                min = dist[w];
                u = w;
            }
        }
        
        flag[u] = 1;
        count++;

        for (w = 1; w <= n; w++){
            if ((dist[u] + cost[u][w] < dist[w]) && !flag[w]){
                dist[w] = dist[u] + cost[u][w];
            }
        }
    }
}

int main()
{
    int n, v, i, dist[10] = {0};
    
    n = 6;
    printf("\nthe number of nodes: %d \n", n);
    
    printf("\nthe cost matrix:\n");
    int cost[7][7] = {  { 0,        0,        0,        0,        0,        0,        0}, // 0
                        { 0, infinity,        5, infinity, infinity, infinity,        8}, // 1
                        { 0,        5, infinity,        7, infinity,        2, infinity}, // 2
                        { 0, infinity,        7, infinity,        9, infinity, infinity}, // 3
                        { 0, infinity, infinity,        9, infinity,        4, infinity}, // 4
                        { 0, infinity,        2, infinity,        4, infinity, infinity}, // 5
                        { 0,        8, infinity, infinity, infinity, infinity, infinity}  // 6
                    //    0         1          2        3         4         5         6
                    };
    
    v = 2;
    printf("\nthe source matrix: %d \n", v);
    
    dij(n, v, cost, dist);
    
    printf("\nShortest path:\n");
    for (i = 1; i <= n; i++){
        if (i != v){
            printf("%d->%d,cost=%d\n", v, i, dist[i]);
        }
    }

    return 0;
}