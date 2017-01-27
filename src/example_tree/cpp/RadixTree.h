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

#ifndef RADIX_TREE_H
#define RADIX_TREE_H

#include <string>
#include <list>

namespace Radix{

	struct Key{
		Key();
		Key(const char *);
		Key(const char *, std::size_t, bool byte = true);

		const char * value;
		std::size_t length;
	};

	struct Node{
		Node * leftChild;
		Node * rightChild;

		int bitPos;

		Key key;
		void * data;
	};

	class Tree{
		public:
			Tree();

			bool Insert(Key, void *);

			Node * Insert(Key, bool&);

			bool Remove(Key);

			Node * Get(Key);

			std::list<Node *> GetPrefix(Key);

			void Print();

			void Print(Node *);
			
		protected:
			bool getBit(Key, std::size_t);

			bool Compare(Key, Key);

			bool Compare(Key, Key, std::size_t&);

			std::size_t FirstBitDifferent(Key, Key);

			Node * root;

			void PrintS(Node *, std::size_t);

			void Print(Node *, std::size_t);

	};

};

#endif
