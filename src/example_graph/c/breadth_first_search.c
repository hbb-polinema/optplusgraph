/***********************************************************
* You can use all the programs on  www.c-program-example.com
* for personal and learning purposes. For permissions to use the
* programs for commercial purposes,
* contact info@c-program-example.com
* To find more C programs, do visit www.c-program-example.com
* and browse!
* 
* http://www.c-program-example.com/2011/10/c-program-to-implement-breadth-first.html
***********************************************************/

#include <stdio.h>
#include <conio.h>

int a[20][20],
    q[20],
    visited[20],
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

void main()
{
    int v;
    //clrscr();
    
    printf("\n Enter the number of vertices:");
    scanf("%d", &n);

    for (i = 1; i <= n; i++)
    {
        q[i] = 0;
        visited[i] = 0;
    }

    printf("\n Enter graph data in matrix form:\n");
    for (i = 1; i <= n; i++)
        for (j = 1; j <= n; j++)
            scanf("%d", &a[i][j]);
    
    printf("\n Enter the starting vertex:");
    scanf("%d", &v);

    bfs(v);
    
    printf("\n The node which are reachable are:\n");
    for (i = 1; i <= n; i++)
        if (visited[i])
            printf("%d\t", i);
        else
            printf("\n Bfs is not possible");
    
    getch();
}