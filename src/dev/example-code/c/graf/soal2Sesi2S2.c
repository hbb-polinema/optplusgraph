#include <stdio.h>
#include <time.h>
#define infinity 999

int graf[4][4], X[4], n, c = 0;

int R(const int M, const int N)
{
    return rand() % (N - M) + M;
}

void G()
{
    int i, j;

    n = R(2, 4);

    for (i = 1; i < n; i++)
    {
        for (j = 1; j < n; j++)
        {
            graf[i][j] = R(0, 17);
            if (graf[i][j] == 0)
            {
                graf[i][j] = infinity;
                graf[j][i] = infinity;
            }
            else
            {
                graf[j][i] = graf[i][j];
            }
        }

        X[i] = 0;
    }

    for (i = 1; i < n; i++)
    {
        printf("\n");

        for (j = 1; j < n; j++)
            printf("\t%d", graf[i][j]);
    }
}

void F(int s)
{
    int i, n;

    X[s] = 1;

    printf("%d--->", s);
    n = minim(s);

    if (n == 999)
    {
        n = 1;
        printf("%d", n);
        c += graf[s][n];

        return;
    }

    F(n);
}

int minim(int c)
{
    int i, nc = 999;
    int min = 999, g_min;

    for (i = 1; i < n; i++)
    {
        if ((graf[c][i] != 0) && (X[i] == 0))
            if (graf[c][i] + graf[i][c] < min)
            {
                min = graf[i][0] + graf[c][i];
                g_min = graf[c][i];
                nc = i;
            }
    }

    if (min != 999)
        c += g_min;

    return nc;
}

int main()
{
    srand(time(NULL));
    G();
    printf("\n");
    F(1);
    printf("\n\nHasil: %d\n ", c);
    return 0;
}
