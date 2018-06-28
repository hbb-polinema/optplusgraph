#include <stdio.h>
#include <time.h>
#define infinity 999

int graf[10][10], X[10], n, c = 0;

int R(const int nMin, const int nMax)
{
    return rand() % (nMax - nMin) + nMin;
}

void Z()
{
    int i, j;

    n = R(3, 9);    

    for (i = 0; i < n; i++)
    {
        for (j = 0; j < n; j++)
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

    for (i = 0; i < n; i++)
    {
        printf("\n");

        for (j = 0; j < n; j++)
            printf("\t%d", graf[i][j]);
    }
}

void fungsiku(int s)
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

    fungsiku(n);
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
    srand(time(NULL));
    Z();
    printf("\n");

    fungsiku(0);

    printf("\n\nMin: %d\n ", c);

    return 0;
}