/*
* Dijsktra (undirected weight graph)
**/

#include<stdio.h>
#include<time.h>
#define infinity 999

int RandomNumberGenerator(const int nMin,const int nMax){return rand()%(nMax-nMin) + nMin;}

void dij(int n, int v, int cost[10][10], int dist[]){int i, u, count, w, flag[10], min;for (i = 1; i <= n; i++) flag[i] = 0, dist[i] = cost[v][i];count = 2;while (count <= n){min = 99;for (w = 1; w <= n; w++) if (dist[w] < min && !flag[w]) min = dist[w], u = w;flag[u] = 1; count++;for (w = 1; w <= n; w++) if ((dist[u] + cost[u][w] < dist[w]) && !flag[w]) dist[w] = dist[u] + cost[u][w];}}

int main(){
    srand(time(NULL));int n, v, i, j, cost[10][10] = {0}, dist[10] = {0};
    n = 7;printf("\nthe number of nodes: %d \n", n);
    printf("\nthe cost matrix:\n"); for (i = 1; i <= n; i++) for (j = 1 + i; j <= n; j++){cost[i][j] = RandomNumberGenerator(0,17);if (cost[i][j] == 0){cost[i][j] = infinity;cost[j][i] = infinity;} else cost[j][i] = cost[i][j];printf("cost[%d][%d]: %d\n",i,j,cost[i][j]);}
    v = RandomNumberGenerator(1,7); printf("\nthe source matrix: %d \n", v); dij(n, v, cost, dist);printf("\nShortest path:\n");
    for (i = 1; i <= n; i++) if (i != v) printf("%d->%d,cost=%d\n", v, i, dist[i]); return 0;
}
