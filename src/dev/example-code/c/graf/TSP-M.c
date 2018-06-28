#include <stdio.h>
#include <time.h>
#define infinity 999

int G[10][10], X[10], n, c = 0;

void Z()
{
    int i, j;
    n = M(4, 7);    
    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n; j++)
        {
            G[i][j] = M(0, 9);
            if (G[i][j] == 0)
            {
                G[i][j] = infinity;
                G[j][i] = infinity;
            }
            else
            {
                G[j][i] = G[i][j];
            }
        }
        X[i] = 0;
    }

    G[1][3] = 9;
    G[3][1] = 9;

    for (i = 0; i < n; i++)
    {
        printf("\n");
        for (j = 0; j < n; j++)
            printf("\t%d", G[i][j]);
    }
}

void F(int s)
{
    int i, n;
    X[s] = 1;
    printf("%d--->", s + 1);
    n = xyz(s);
    if (n == 999)
    {
        n = 0;
        printf("%d", n + 1);
        c += G[s][n];
        return;
    }
    F(n);
}

int M(const int x, const int y){
    return rand() % (y - x) + x;
}

int xyz(int c)
{
    int i, nc = 999;
    int min = 999, kmin;
    for (i = 0; i < n; i++)
    {
        if ((G[c][i] != 0) && (X[i] == 0))
            if (G[c][i] + G[i][c] < min)
            {
                min = G[i][0] + G[c][i];
                kmin = G[c][i];
                nc = i;
            }
    }
    if (min != 999)
        c += kmin;
    return nc;
}

int main()
{
    srand(time(NULL));
    Z();
    printf("\n");
    F(0);
    printf("\nMinimun cost: %d\n ", c);
    return 0;
}
