/* Radix Tree - Copyright (c) 2010 Stephen Cross

 This software is provided 'as-is', without any express or implied
 warranty. In no event will the authors be held liable for any damages
 arising from the use of this software.

 Permission is granted to anyone to use this software for any purpose,
 including commercial applications, and to alter it and redistribute it
 freely, subject to the following restrictions:

    1. The origin of this software must not be misrepresented; you must not
    claim that you wrote the original software. If you use this software
    in a product, an acknowledgment in the product documentation would be
    appreciated but is not required.

    2. Altered source versions must be plainly marked as such, and must not be
    misrepresented as being the original software.

    3. This notice may not be removed or altered from any source
    distribution.
*/

#include <iostream>
#include <cstring>
#include <stack>

#include "RadixTree.h"

namespace Radix{

Key::Key(){
	value = NULL;
	length = 0;
}

Key::Key(const char * val){
	value = val;
	length = strlen(val) << 3;
}

Key::Key(const char * val, std::size_t len, bool byte){
	value = val;
	length = byte ? len << 3 : len;
}

Tree::Tree(){
	root = new Node;
	root->bitPos = -1;
	root->data = NULL;
	root->leftChild = root;
	root->rightChild = root;
}

bool Tree::Insert(Key key, void * data){
	bool b;
	Node * node = Insert(key, b);

	if(b){
		node->data = data;
	}

	return b;
}

Node * Tree::Insert(Key key, bool& b){
	Node * p, * t, * x;

	// Start at the root
	p = root;
	t = p->leftChild;

	// Navigate down the tree and look for the key
	while (p->bitPos < t->bitPos) {
		p = t;
		t = getBit(key, t->bitPos) ? t->rightChild : t->leftChild;
	}

	std::size_t i;

	// Find the first bit that does not match.
	if(Compare(key, t->key, i)){
		// The key already exists
		b = false;
		return t;
	}

	// Find the appropriate place in the tree where
	// the node has to be inserted
	p  = root;
	x  = p->leftChild;
	while(p->bitPos < x->bitPos && x->bitPos < i){
		p = x;
		x = getBit(key, x->bitPos) ? x->rightChild : x->leftChild;
	}

	// Allocate a new node and initialize it.
	t = new Node;
	t->key = key;
	t->data = NULL;
	t->bitPos = i;

	if(getBit(key, i)){
		t->leftChild = x;
		t->rightChild = t;
	}else{
		t->leftChild = t;
		t->rightChild = x;
	}

	// Rewire
	if(getBit(key, p->bitPos)){
		p->rightChild = t;
	}else{
		p->leftChild = t;
	}

	// This is a new node
	b = true;

	// Return the newly created node
	return t;
}

bool Tree::Remove(Key key){
	// Start at the root
	Node * pPrev = root;
	Node * p = root;
	Node * t = p->leftChild;

	// Navigate down the tree and look for the key
	while (p->bitPos < t->bitPos) {
		pPrev = p;
		p = t;
		t = getBit(key, t->bitPos) ? t->rightChild : t->leftChild;
	}

	if(!Compare(key, t->key)){
		return false;
	}

	// Copy p's key to t
	if(t != p){
		t->key = p->key;
	}

	// Is p a leaf?
	std::size_t parentBitPos = p->bitPos;
	std::size_t leftBitPos = p->leftChild->bitPos;
	std::size_t rightBitPos = p->rightChild->bitPos;

	if ((leftBitPos > parentBitPos) || (rightBitPos > parentBitPos)) {
		
        // There is at least one downward edge.

		if (p != t) {
			
			// Look for a new (intermediate) key
			Key pKey(p->key);

			Node * lp = p;
			Node * x = getBit(pKey, p->bitPos) ? p->rightChild : p->leftChild;
      
			while(lp->bitPos < x->bitPos){
				lp = x;
				x  = getBit(pKey, x->bitPos) ? x->rightChild : x->leftChild;
			}

			// If the intermediate key was not found, we have a problem..
            		if(!Compare(pKey, x->key)){
				return false; // The key could not be found!
			}

			// Rewire the leaf (lp) to point to t
			if(getBit(pKey, lp->bitPos)){
				lp->rightChild = t;
			}else{
				lp->leftChild = t;
			}
		}

		// Rewire the parent to point to the real child of p
		if (p != pPrev) {
			Node * ch = getBit(key, p->bitPos) ? p->leftChild : p->rightChild;
			if(getBit(key, pPrev->bitPos)){
				pPrev->rightChild = ch;
			}else{
				pPrev->leftChild = ch;
			}
		}

	} else {

		// Both edges (left, right) are pointing upwards or to the node (self-edges).
    
		// Rewire the parent
		if(pPrev != p){
			Node * pLeft = p->leftChild;
			Node * pRight = p->rightChild;

			Node * item = (p == pLeft && pLeft == pRight) ? pPrev : (p == pLeft ? pRight : pLeft);
			
			if(getBit(key, pPrev->bitPos)){
				pPrev->rightChild = item;
			}else{
				pPrev->leftChild  = item;
			}
		}

	}

	// Deallocate p (no longer needed)
	//delete p;

	return true;
}

Node * Tree::Get(Key key){
	Node * p, * x;

	p = root;
	x = root->leftChild;

	while (p->bitPos < x->bitPos) {
		p = x;
		x = getBit(key, x->bitPos) ? x->rightChild : x->leftChild;
	}

	if(!Compare(key, x->key)){
		return NULL;
	}

	return x;
}

std::list<Node *> Tree::GetPrefix(Key key){
	Node * p = root, * x = root->leftChild;

	std::stack<Node *> nodeStack;
	std::list<Node *> nodeList;

	while (x->bitPos < key.length) {
		if(p->bitPos >= x->bitPos){
			break;
		}
		
		p = x;
		x = getBit(key, x->bitPos) ? x->rightChild : x->leftChild;
	}

	if(x == root){
		return nodeList;
	}else if(p->bitPos < x->bitPos){
		nodeStack.push(x);
	}else{
		nodeList.push_back(x);
	}

	while(!nodeStack.empty()){
		Node * cnode = nodeStack.top();
		nodeStack.pop();

		if(cnode->bitPos < cnode->leftChild->bitPos){
			nodeStack.push(cnode->leftChild);
		}else{
			nodeList.push_back(cnode->leftChild);
		}

		if(cnode->bitPos < cnode->rightChild->bitPos){
			nodeStack.push(cnode->rightChild);
		}else{
			nodeList.push_back(cnode->rightChild);
		}
	}

	std::list<Node *>::iterator pos;

	for(pos = nodeList.begin(); pos != nodeList.end(); ){
		if(*pos == root || FirstBitDifferent(key, (*pos)->key) < key.length){
			pos = nodeList.erase(pos);
		}else{
			++pos;
		}
	}

	return nodeList;
}

void Tree::Print(){
	Print(root, 0);
}

void Tree::Print(Node * node){
	Print(node, 0);
}

void Tree::PrintS(Node * node, std::size_t t){
	std::string tab(t, '\t');

	if(node->key.length > 0){
		std::cout << tab << "Node = \"" << node->key.value << "\" - " << node->bitPos << std::endl;
	}else{
		std::cout << tab << "Node = root - " << node->bitPos << std::endl;
	}
}

void Tree::Print(Node * node, std::size_t t){
	std::string tab(t, '\t');

	PrintS(node, t);

	std::cout << tab << "Left{" << std::endl;
	if(node->bitPos < node->leftChild->bitPos){
		Print(node->leftChild, t + 1);
	}else{
		PrintS(node->leftChild, t + 1);
	}
	std::cout << tab << "}" << std::endl;

	std::cout << tab << "Right{" << std::endl;
	if(node->bitPos < node->rightChild->bitPos){
		Print(node->rightChild, t + 1);
	}else{
		PrintS(node->rightChild, t + 1);
	}
	std::cout << tab << "}" << std::endl;
}

bool Tree::getBit(Key key, std::size_t pos){
	if(pos >= key.length){
		return false;
	}

	return key.value[pos >> 3] & (0x01 << (pos & 7));
}

bool Tree::Compare(Key keyL, Key keyR){
	if(keyL.length != keyR.length){
		return false;
	}

	std::size_t byteLen = keyL.length >> 3;
	std::size_t pos;

	for(pos = 0; pos < byteLen; ++pos){
		if(keyL.value[pos] != keyR.value[pos]){
			return false;
		}
	}

	for(pos <<= 3; pos < keyL.length; ++pos){
		if(getBit(keyL, pos) != getBit(keyR, pos)){
			return false;
		}
	}

	return true;
}

bool Tree::Compare(Key keyL, Key keyR, std::size_t& pos){
	std::size_t shortLen;
	std::size_t longLen;

	bool isEqual;

	if(keyL.length < keyR.length){
		shortLen = keyL.length;
		longLen = keyR.length;
		isEqual = false;
	}else{
		shortLen = keyR.length;
		longLen = keyL.length;
		isEqual = (keyL.length == keyR.length);
	}

	std::size_t byteLen = shortLen >> 3;

	for(pos = 0; pos < byteLen; ++pos){
		if(keyL.value[pos] != keyR.value[pos]){
			break;
		}
	}

	for(pos <<= 3; pos < longLen; ++pos){
		if(getBit(keyL, pos) != getBit(keyR, pos)){
			return false;
		}
	}

	return isEqual;
}

std::size_t Tree::FirstBitDifferent(Key keyL, Key keyR){
	std::size_t s;
	Compare(keyL, keyR, s);
	return s;
}

}

