#pragma once

#include <Windows.h>
#include "Reader.h"

class BaseJTNode
{
public:
	BaseJTNode(void);
	~BaseJTNode(void);

protected:

	INT32 TraverseBaseNodeData(void);
	Reader _reader;
	INT32* filePointer;
	float _fileVersion;
};

