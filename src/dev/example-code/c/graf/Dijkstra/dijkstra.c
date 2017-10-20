/***********************************************************
* Eksperimen Algoritma Dijsktra
* 
* http://www.c-program-example.com/2011/10/c-program-to-solve-dijkstras-algorithm.html
***********************************************************/

#include<stdio.h>
#include<time.h>
#define infinity 999

int RandomNumberGenerator(const int nMin,const int nMax,const int  nNumOfNumsToGenerate){
    int nRandonNumber = 0;    
    for (int i = 0; i < nNumOfNumsToGenerate; i++){
        nRandonNumber = rand()%(nMax-nMin) + nMin;
    }
    return nRandonNumber;
}

void dij(int n, int v, int cost[10][10], int dist[])
{
    int i, u, count, w, flag[10], min;

    for (i = 1; i <= n; i++)
        flag[i] = 0, dist[i] = cost[v][i];
    
    count = 2;
    
    while (count <= n)
    {
        min = 99;
        for (w = 1; w <= n; w++)
            if (dist[w] < min && !flag[w])
                min = dist[w], u = w;
        flag[u] = 1;
        count++;
        for (w = 1; w <= n; w++)
            if ((dist[u] + cost[u][w] < dist[w]) && !flag[w])
                dist[w] = dist[u] + cost[u][w];
    }    
}

int main()
{
    srand(time(NULL));
    int n, v, i, j, cost[10][10], dist[10];
    
    n = 7;
    printf("\nthe number of nodes: %d \n", n);
    
    printf("\nEnter the cost matrix:\n");
    for (i = 1; i <= n; i++)
        for (j = 1; j <= n; j++)
        {
            cost[i][j] = RandomNumberGenerator(1,37,1);
            if (cost[i][j] == 0)
                cost[i][j] = infinity;
            printf("cost[%d][%d]: %d\n",i,j,cost[i][j]);
        }
    
    v = RandomNumberGenerator(1,7,1);
    printf("\nthe source matrix: %d \n", v);
    
    dij(n, v, cost, dist);
    
    printf("\nShortest path:\n");
    for (i = 1; i <= n; i++)
        if (i != v)
            printf("%d->%d,cost=%d\n", v, i, dist[i]);
    
    return 0;
}