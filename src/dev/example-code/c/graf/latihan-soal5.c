#include <stdio.h>

int G[10][10], completed[10], n, cost = 0;

void takeInput()
{
    int i, j;

    printf("the number of villages: ");
    n = 4;

    printf("\nthe Cost Matrix\n");

    for (i = 0; i < n; i++)
    {
        printf("\nElements of Row: %d\n", i + 1);
        G[i][0] = 3;
        G[i][1] = 7;
        G[i][2] = 4;
        G[i][3] = 9;
        completed[i] = 0;
    }

    printf("\n\nThe cost list is:");

    for (i = 0; i < n; i++)
    {
        printf("\n");

        for (j = 0; j < n; j++)
            printf("\t%d", G[i][j]);
    }
}

void mincost(int city)
{
    int i, ncity;

    completed[city] = 1;

    printf("%d--->", city + 1);
    ncity = least(city);

    if (ncity == 999)
    {
        ncity = 0;
        printf("%d", ncity + 1);
        cost += G[city][ncity];

        return;
    }

    mincost(ncity);
}

int least(int c)
{
    int i, nc = 999;
    int min = 999, kmin;

    for (i = 0; i < n; i++)
    {
        if ((G[c][i] != 0) && (completed[i] == 0))
            if (G[c][i] + G[i][c] < min)
            {
                min = G[i][0] + G[c][i];
                kmin = G[c][i];
                nc = i;
            }
    }

    if (min != 999)
        cost += kmin;

    return nc;
}

int main()
{
    takeInput();

    printf("\n\nThe Path is:\n");
    mincost(0);

    printf("\n\nMinimum cost is %d\n ", cost);

    return 0;
}
