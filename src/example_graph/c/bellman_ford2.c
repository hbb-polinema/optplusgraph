// source: http://www.codingalpha.com/bellman-ford-algorithm-c-program/
/*
Algorithm For Bellman Ford Algorithm

1.    Initialize the predecessor of all the vertices to NIL and pathLength of all vertices to Infinity.
2.    Set the pathLength of the source vertex to zero and add it to the Queue.
3.    Delete a vertex from the Queue and set it as the current vertex.
4.    Check all the adjacent vertices of the current vertex. Check minimum weight condition for these vertices and do relabeling if needed.
5.    Every vertex is relabeled is inserted into the queue if it is not present in the queue.
6.    Repeat Steps 3, 4 and 5 till the Queue Underflow condition is satisfied. Queue underflow occurs when the Queue becomes Empty.

*/

#include <stdlib.h>
#include <stdio.h>

#define MAX 100
#define TRUE 1
#define FALSE 0
#define infinity 9999
#define NIL -1

int vertices;
int front, rear;

int queue[MAX];
int pathLength[MAX];
int adjacent_matrix[MAX][MAX];
int predecessor[MAX];
int isPresent_in_queue[MAX];

int BellmanFord_Algorithm(int source);
void initialize();
void insert(int u);
int del();
int isEmpty();
void make_graph();
void pathFinder(int source, int vertex);
void showTable();
void show_queue();

int main()
{
    int flag, source, vertex;
    make_graph();

    printf("Enter Source Vertex:\t");
    scanf("%d", &source);

    flag = BellmanFord_Algorithm(source);
    if (flag == -1)
    {
        printf("Negative Cycle in the Graph. Cannot Proceed.\n");
        exit(1);
    }

    while (1)
    {
        printf("Enter Destination Vertex(-1 to Quit):\t");
        scanf("%d", &vertex);

        if (vertex == -1)
        {
            break;
        }

        if (vertex < 0 || vertex >= vertices)
        {
            printf("Vertex %d does not exist\n", vertex);
        }
        else if (vertex == source)
        {
            printf("Source Vertex and Destination Vertex are same\n");
        }
        else if (pathLength[vertex] == infinity)
        {
            printf("No path from Source to Destination Vertex\n");
        }
        else
        {
            pathFinder(source, vertex);
        }
    }

    return 0;
}

void pathFinder(int source, int vertex)
{
    int count, u;
    int path[MAX];
    int shortest_distance = 0;
    int temp = 0;

    while (vertex != source)
    {
        temp++;
        path[temp] = vertex;
        u = predecessor[vertex];
        shortest_distance = shortest_distance + adjacent_matrix[u][vertex];
        vertex = u;
    }

    temp++;
    path[temp] = source;

    printf("Shortest Path:\n");
    for (count = temp; count >= 1; count--)
    {
        printf("%3d", path[count]);
    }

    printf("\nShortest Distance:\t%d\n", shortest_distance);
}

int BellmanFord_Algorithm(int source)
{
    int k = 0, count, current;

    for (count = 0; count < vertices; count++)
    {
        predecessor[count] = NIL;
        pathLength[count] = infinity;
        isPresent_in_queue[count] = FALSE;
    }

    initialize();
    printf("Make pathLength of source vertex 0\n");
    pathLength[source] = 0;

    printf("Insert Source Vertex in the Queue\n");
    insert(source);

    isPresent_in_queue[source] = TRUE;
    show_queue();
    showTable();
    getchar();

    while (!isEmpty())
    {
        current = del();
        isPresent_in_queue[current] = FALSE;

        printf("Current vertex: \t%d\n", current);

        if (source == current)
        {
            k++;
        }

        if (k > vertices)
        {
            return -1;
        }

        for (count = 0; count < vertices; count++)
        {
            if (adjacent_matrix[current][count] != 0)
            {
                printf("Vertex [%d] is adjacent to the Current Vertex [%d]\n", count, current);
                if (pathLength[count] > pathLength[current] + adjacent_matrix[current][count])
                {
                    printf("pathLength(%d) + weight(%d, %d) < pathLength(%d)\t", current, current, count, count);
                    printf("%d +  %d < %d\n", pathLength[current], adjacent_matrix[current][count], pathLength[count]);

                    pathLength[count] = pathLength[current] + adjacent_matrix[current][count];
                    predecessor[count] = current;

                    printf("Relabel vertex: %d\n", count);
                    printf("pathLength[%d] = %d ,  ", count, pathLength[count]);
                    printf("predecessor[%d] = %d\n", count, current);

                    if (!isPresent_in_queue[count])
                    {
                        insert(count);
                        isPresent_in_queue[count] = TRUE;
                        printf("Insert %d in the queue\n\n", count);
                    }
                    else
                        printf("%d is present in the queue\n\n", count);
                }
                else
                {
                    if (pathLength[current] + adjacent_matrix[current][count] == pathLength[count])
                    {
                        printf("pathLength(%d) + weight(%d, %d) = pathLength(%d)\t", current, current, count, count);
                        printf("%d + %d = %d\n", pathLength[current], adjacent_matrix[current][count], pathLength[count]);
                    }
                    else
                    {
                        printf("pathLength(%d) + weight(%d, %d) > pathLength(%d)\t", current, current, count, count);
                        printf("%d + %d > %d\n", pathLength[current], adjacent_matrix[current][count], pathLength[count]);
                    }
                    printf("Vertex [%d] Should Not Be Relabelled\n\n", count);
                }
            }
        }

        show_queue();
        showTable();
        getchar();
    }

    return 1;
}

void showTable()
{
    int count;
    
    printf("\nVertex  pathLength  Predecessor\n");
    for (count = 0; count < vertices; count++)
    {
        printf("%d\t%d\t\t", count, pathLength[count]);
        if (predecessor[count] == NIL)
        {
            printf("NIL\n");
        }
        else
        {
            printf("%d\n", predecessor[count]);
        }
    }

    printf("\n\n");
}

void initialize()
{
    int count;
    
    for (count = 0; count < MAX; count++)
    {
        queue[count] = 0;
    }
    rear = -1;
    front = -1;
}

int isEmpty()
{
    if (front == -1 || front > rear)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

void insert(int element)
{
    if (rear == MAX - 1)
    {
        printf("Queue Overflow\n");
        exit(1);
    }
    else
    {
        if (front == -1)
        {
            front = 0;
        }
        rear = rear + 1;
        queue[rear] = element;
    }
}

int del()
{
    int element;
    if (front == -1 || front > rear)
    {
        printf("Queue Underflow\n");
        exit(1);
    }
    else
    {
        element = queue[front];
        front = front + 1;
    }
    return element;
}

void show_queue()
{
    int count;
    
    if (isEmpty())
    {
        printf("Queue is Empty\n");
        return;
    }
    
    printf("QUEUE\n");
    for (count = front; count <= rear; count++)
    {
        printf("%4d", queue[count]);
    }
    
    printf("\n\n");
}

void make_graph()
{
    int count, maximum_edges, origin_vertex, destination_vertex, weight;
    
    printf("Enter total number of vertices:\t");
    scanf("%d", &vertices);
    
    maximum_edges = vertices * (vertices - 1);
    
    for (count = 0; count < maximum_edges; count++)
    {
        printf("Enter Edge [%d] Co-ordinates [-1 -1] to Quit\n", count + 1);
        
        printf("Enter Origin Vertex Point:\t");
        scanf("%d", &origin_vertex);
        
        printf("Enter Destination Vertex Point:\t");
        scanf("%d", &destination_vertex);
        
        if ((origin_vertex == -1) && (destination_vertex == -1))
        {
            break;
        }
        
        printf("Enter the weight for this edge:\t");
        scanf("%d", &weight);
        
        if (origin_vertex >= vertices || destination_vertex >= vertices || origin_vertex < 0 || destination_vertex < 0)
        {
            printf("Edge Co - ordinates are Invalid\n");
            count--;
        }
        else
        {
            adjacent_matrix[origin_vertex][destination_vertex] = weight;
        }
    }
}