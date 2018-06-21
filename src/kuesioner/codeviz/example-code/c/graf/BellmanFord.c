// source: http://cyberlingo.blogspot.co.id/2015/07/bellman-ford-algorithm.html
#include<stdio.h>
#include<stdlib.h>
#include<time.h>

int RandomNumberGenerator(const int nMin,const int nMax){
    return rand()%(nMax-nMin) + nMin;
}

int Bellman_Ford(int G[10][10], int V, int E, int edge[10][2])
{
    int i, u, v, k, distance[10], parent[10], S, flag = 1;
    
    for (i = 0; i < V; i++)
        distance[i] = 1000, parent[i] = -1;
    
    printf("\nEnter source: ");    
    S = RandomNumberGenerator(2,9);
    printf("%d", S);
    
    distance[S - 1] = 0;
    
    for (i = 0; i < V - 1; i++)
    {
        for (k = 0; k < E; k++)
        {
            u = edge[k][0], v = edge[k][1];
            if (distance[u] + G[u][v] < distance[v])
                distance[v] = distance[u] + G[u][v], parent[v] = u;
        }
    }
    
    for (k = 0; k < E; k++)
    {
        u = edge[k][0], v = edge[k][1];
        if (distance[u] + G[u][v] < distance[v])
            flag = 0;
    }
    
    if (flag)
        for (i = 0; i < V; i++)
            printf("Vertex %d -> cost = %d parent = %d\n", i + 1, distance[i], parent[i] + 1);

    return flag;
}

int main()
{
    srand(time(NULL));
    int V, edge[10][2], G[10][10], i, j, k = 0;
    
    printf("BELLMAN FORD\n");
    printf("Enter no. of vertices: ");
    V = RandomNumberGenerator(6,10);
    printf("%d", V);
    
    printf("\nEnter graph in matrix form:\n");
    for (i = 0; i < V; i++)
        for (j = 0; j < V; j++)
        {
            G[i][j] = RandomNumberGenerator(6,10);
            if (G[i][j] != 0)
                edge[k][0] = i, edge[k++][1] = j;
        }

    if (Bellman_Ford(G, V, k, edge))
        printf("\nNo negative weight cycle\n");
    else
        printf("\nNegative weight cycle exists\n");
    
    return 0;
}