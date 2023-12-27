#pragma once
#include "groupjtnode.h"

class PartitionNodeElement : public GroupJTNode
{
public:
	PartitionNodeElement(void);
	~PartitionNodeElement(void);
	void TraversePartitionNode(INT32 filePosCount);
};

