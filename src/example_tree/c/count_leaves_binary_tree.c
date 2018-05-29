/***********************************************************
* You can use all the programs on  www.c-program-example.com
* for personal and learning purposes. For permissions to use the
* programs for commercial purposes,
* contact info@c-program-example.com
* To find more C programs, do visit www.c-program-example.com
* and browse!
* 
* http://www.c-program-example.com/2012/03/c-program-to-count-leaves-of-binary.html
***********************************************************/

#include <stdio.h>
#include <stdlib.h>
// #include <conio.h>

struct node
{
    int data;
    struct node *leftnode;
    struct node *rightnode;
};

//get the leaves count
unsigned int getLeafCount(struct node *node)
{
    if (node == NULL)
        return 0;
    if (node->leftnode == NULL && node->rightnode == NULL)
        return 1;
    else
        return getLeafCount(node->leftnode) +
               getLeafCount(node->rightnode);
}

struct node *newNode(int data)
{
    struct node *node = (struct node *) malloc(sizeof(struct node));
    node->data = data;
    node->leftnode = NULL;
    node->rightnode = NULL;

    return (node);
}

int main()
{
    //clrcsr();
    
    struct node *root = newNode(1);
    root->leftnode = newNode(2);
    root->rightnode = newNode(3);
    root->leftnode->leftnode = newNode(4);
    root->leftnode->rightnode = newNode(5);

    printf("\n\nLeaf count of the binary tree is %d \n\n", getLeafCount(root));

    // getch();
    return 0;
}