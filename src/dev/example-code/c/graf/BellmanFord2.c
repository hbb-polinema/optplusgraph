#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>
 
struct Edge
{
    int source, destination, weight;
};

struct Graph
{
    int V, E;
    struct Edge* edge;
};
 
struct Graph* createGraph(int V, int E)
{
    struct Graph* graph = (struct Graph*) malloc( sizeof(struct Graph));
    graph->V = V;
    graph->E = E; 
    graph->edge = (struct Edge*) malloc( graph->E * sizeof( struct Edge ) );
    return graph;
}
 
void FinalSolution(int dist[], int n)
{
    printf("\nVertex\tDistance from Source Vertex\n");
    int i;
 
    for (i = 0; i < n; ++i){
        printf("%d \t\t %d\n", i, dist[i]);
    }
}
 
void BellmanFord(struct Graph* graph, int source)
{
    int V = graph->V;
    int E = graph->E;
    int StoreDistance[V];
    int i,j;
 
    for (i = 0; i < V; i++)
        StoreDistance[i] = INT_MAX;
 
    StoreDistance[source] = 0;
 
    for (i = 1; i <= V-1; i++)
    {
        for (j = 0; j < E; j++)
        {
            int u = graph->edge[j].source;
            int v = graph->edge[j].destination;
            int weight = graph->edge[j].weight;
 
            if (StoreDistance[u] + weight < StoreDistance[v])
                StoreDistance[v] = StoreDistance[u] + weight;
        }
    }
 
    for (i = 0; i < E; i++)
    {
        int u = graph->edge[i].source;
 
        int v = graph->edge[i].destination;
 
        int weight = graph->edge[i].weight;
 
        if (StoreDistance[u] + weight < StoreDistance[v])
            printf("This graph contains negative edge cycle\n");
    }
 
    FinalSolution(StoreDistance, V);
 
    return;
}
 
int main()
{
    int V,E,S,i;
 
    V = 5;
    printf("The number of vertices in graph: %d\n", V);
 
    E = 10;
    printf("The number of edges in graph: %d\n", E);    
 
    S = 0;
    printf("Your source vertex number: %d\n", S);
 
    struct Graph* graph = createGraph(V, E);
    
    i = 0;
    graph->edge[i].source = 0;
    graph->edge[i].destination = 1;
    graph->edge[i].weight = 6;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    i = 1;
    graph->edge[i].source = 0;
    graph->edge[i].destination = 2;
    graph->edge[i].weight = 7;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    i = 2;
    graph->edge[i].source = 1;
    graph->edge[i].destination = 2;
    graph->edge[i].weight = 8;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    i = 3;
    graph->edge[i].source = 1;
    graph->edge[i].destination = 4;
    graph->edge[i].weight = -4;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    i = 4;
    graph->edge[i].source = 1;
    graph->edge[i].destination = 3;
    graph->edge[i].weight = 5;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    i = 5;
    graph->edge[i].source = 3;
    graph->edge[i].destination = 1;
    graph->edge[i].weight = -2;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    i = 6;
    graph->edge[i].source = 2;
    graph->edge[i].destination = 3;
    graph->edge[i].weight = -3;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    i = 7;
    graph->edge[i].source = 2;
    graph->edge[i].destination = 4;
    graph->edge[i].weight = 9;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    i = 8;
    graph->edge[i].source = 4;
    graph->edge[i].destination = 0;
    graph->edge[i].weight = 2;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    i = 9;
    graph->edge[i].source = 4;
    graph->edge[i].destination = 3;
    graph->edge[i].weight = 7;
    printf("\nEdge %d properties Source, destination, weight respectively\n %d %d %d", i+1, graph->edge[i].source, graph->edge[i].destination, graph->edge[i].weight);
    
    BellmanFord(graph, S);
 
    return 0;
}