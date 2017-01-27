/***********************************************************
* You can use all the programs on  www.c-program-example.com
* for personal and learning purposes. For permissions to use the
* programs for commercial purposes,
* contact info@c-program-example.com
* To find more C programs, do visit www.c-program-example.com
* and browse!
*  This program was originally published at
*  http://www.c-program-example.com/2011/09/c-program-for-binary-search.html
*                                  Happy Coding
***********************************************************/

/*C Program for Binary search */

#include <stdio.h>

int main()
{

    int a[30], item, i, mid, top, bottom;
    
    a[0] = 1;
    a[1] = 3;
    a[2] = 5;
    a[3] = 7;
    a[4] = 8;
    a[5] = 10;
    a[6] = 14;
    a[7] = 15;
    a[8] = 16;
    a[9] = 19;
    a[10] = 21;
    a[11] = 31;
    a[12] = 51;
    
    item = 13;
    bottom = 1;
    top = n;

    do
    {
        mid = (bottom + top) / 2;
        if (item < a[mid])
            top = mid - 1;
        else if (item > a[mid])
            bottom = mid + 1;
    } while (item != a[mid] && bottom <= top);

    if (item == a[mid])
    {
        printf("Binary search successfull!!\n");
        printf("\n %d found in position: %d\n", item, mid + 1);
    }
    else
    {
        printf("\n  Search failed\n %d not found\n", item);
    }
    
    return 0;
}