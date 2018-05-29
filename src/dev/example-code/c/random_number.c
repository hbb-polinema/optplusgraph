#include <time.h>
#include <stdlib.h>
#include <stdio.h>

// the random function
int RandomNumberGenerator(const int nMin,const int nMax,const int  nNumOfNumsToGenerate){
    int nRandonNumber = 0;
    srand(time(NULL));
    for (int i = 0; i < nNumOfNumsToGenerate; i++){
        nRandonNumber = rand()%(nMax-nMin) + nMin;
    }
    return nRandonNumber;
}

int main(){
    printf("%d ", RandomNumberGenerator(1,10,1));
    return 0;
}