/*
- Matriks Global Variable
- Instant initial value
- weighted - undirected
*/

#include<stdio.h>

int row = 4, col = 4;
int i, j,
cost[4][4] = {  { 0, 2, 3, 1},
                { 2, 0, 7, 9},
                { 3, 7, 0, 8},
                { 1, 9, 8, 0}
             };

int main()
{
    printf("\nthe matrix:\n");
    for (i = 0; i < row; i++)
        for (j = 0; j < col; j++)
            printf("cost[%d][%d]: %d\n",i,j,cost[i][j]);

    return 0;
}