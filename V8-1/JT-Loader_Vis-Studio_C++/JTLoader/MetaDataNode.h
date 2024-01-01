#pragma once
#include "GroupJTNode.h"

class MetaDataNode : public GroupJTNode
{
public:
	MetaDataNode(void);
	~MetaDataNode(void);

private:
	vector<UCHAR> _unZippedBytes;
};