#include <stdio.h>

int graf[5][5], X[5], n, c = 0;

void Z()
{
    int i, j;
    n = 5;

    for (i = 0; i < n; i++)
    {
        X[i] = 0;
    }

    graf[1][1] = 0;
    graf[1][2] = 4;
    graf[1][3] = 1;
    graf[1][4] = 3;
    graf[2][1] = 4;
    graf[2][2] = 0;
    graf[2][3] = 2;
    graf[2][4] = 1;
    graf[3][1] = 1;
    graf[3][2] = 2;
    graf[3][3] = 0;
    graf[3][4] = 5;
    graf[4][1] = 3;
    graf[4][2] = 1;
    graf[4][3] = 5;
    graf[4][4] = 0;

    for (i = 0; i < n; i++)
    {
        printf("\n");
        for (j = 0; j < n; j++)
            printf("\t%d", graf[i][j]);
    }
}

void Q(int s)
{
    int i, n;

    X[s] = 1;

    printf("%d--->", s + 1);
    n = xyz(s);

    if (n == 999)
    {
        n = 0;
        printf("%d", n + 1);
        c += graf[s][n];

        return;
    }

    Q(n);
}

int xyz(int c)
{
    int i, nc = 999;
    int min = 999, kmin;

    for (i = 0; i < n; i++)
    {
        if ((graf[c][i] != 0) && (X[i] == 0))
            if (graf[c][i] + graf[i][c] < min)
            {
                min = graf[i][0] + graf[c][i];
                kmin = graf[c][i];
                nc = i;
            }
    }

    if (min != 999)
        c += kmin;

    return nc;
}

int main()
{
    Z();
    printf("\n");
    Q(0);
    printf("\n\nHasil: %d\n ", c);

    return 0;
}
