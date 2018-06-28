#include<stdio.h>
#define Z 999

void A(int n, int v, int cost[][], int dist[10]){
    int i, u, count, w, F[10], min;

    for (i = 1; i <= n; i++){
        F[i] = 0;
        dist[i] = cost[v][i];
    }
    
    count = 2;
    
    while (count <= n){
        min = 99;
        for (w = 1; w <= n; w++){
            if (dist[w] < min && !F[w]){
                min = dist[w];
                u = w;
            }
        }
        
        F[u] = 1;
        count++;

        for (w = 1; w <= n; w++){
            if ((dist[u] + cost[u][w] < dist[w]) && !F[w]){
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
    int graf[7][7] = {  { 0,        0,        0,        0,        0,        0,        0}
                        { 0, Z,        5, Z, Z, Z,        8},
                        { 0,        5, Z,        7, Z,        2, Z},
                        { 0, Z,        7, Z,        9, Z, Z},
                        { 0, Z, Z,        9, Z,        4, Z},
                        { 0, Z,        2, Z,        4, Z, Z},
                        { 0,        8, Z, Z, Z, Z, Z} 
                    };
    
    v = 2;
    printf("\nthe source matrix: %d \n", v);
    
    A(n, v, graf, dist);
    
    printf("\nShortest path:\n");
    for (i = 1; i <= n; i++){
        if (i != v){
            printf("%d->%d,graf=%d\n", v, i, dist[i]);
        }
    }

    return 0;
}