// http://www.c-program-example.com/2011/10/c-program-to-implement-breadth-first.html
#include<time.h>
#include<stdio.h>
#include<stdlib.h>

int a[7][7],
    q[10],
    visited[10],
    n,
    i,
    j,
    f = 0,
    r = -1;

int RandomNumberGenerator(const int nMin,const int nMax,const int  nNumOfNumsToGenerate){
    int nRandonNumber = 0;    
    for (int i = 0; i < nNumOfNumsToGenerate; i++){
        nRandonNumber = rand()%(nMax-nMin) + nMin;
    }
    return nRandonNumber;
}

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
    int v, temp;
    srand(time(NULL));

    printf("\nEnter the number of vertices: 5");
    n = 5;

    for (i = 1; i <= n; i++)
    {
        q[i] = 0;
        visited[i] = 0;
    }

    printf("\ngraph data in matrix form:\n");
    for (i = 1; i <= n; i++)
        for (j = 1; j <= n; j++){
            temp = RandomNumberGenerator(1,10,1);
            if (temp % 2 == 0) a[i][j] = 0;
            else a[i][j] = 1;
            printf("a[%d][%d]: %d\n", i, j, a[i][j]);
        }
    printf("\nthe starting vertex: 2");
    v = 2;

    bfs(v);
    
    printf("\nThe node which are reachable are:\n");
    for (i = 1; i <= n; i++)
        if (visited[i])
            printf("%d\t", i);
        else
            printf("\n Bfs is not possible");
    
    return 0;
}