/*
- Matriks Global Variable
- input value one by one
- weighted - directed
*/

#include<stdio.h>

int row = 4, col = 4;
int i, j,
cost[4][4];

int main()
{
    printf("\nthe matrix:\n");
    cost[0][1] = 2;
    cost[0][2] = 3;
    cost[0][3] = 1;
    cost[1][2] = 7;
    cost[1][3] = 9;
    cost[2][3] = 8;
   
    for (i = 0; i < row; i++)
        for (j = 0; j < col; j++)
            printf("cost[%d][%d]: %d\n",i,j,cost[i][j]);

    return 0;
}